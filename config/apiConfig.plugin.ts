const { createRoute, z } = require('@hono/zod-openapi');
const { createDocument } = require('zod-openapi');

const fs = require('fs');
const path = require('path');


/**
 * Recursive function to convert OpenAPI schema to a Zod schema.
 * @param {Object} data - OpenAPI schema
 * @returns {ZodObject} - Zod schema
 */
const convertToZodSchema = (data) => {
    const keys = Object.keys(data);
    const schema = z.object({});
    for (const key of keys) {
        if (typeof data[key] === 'object') {
            schema.shape[key] = convertToZodSchema(data[key]);
        } else ({
            string: () => schema.shape[key] = z.string().openapi({ description: data[key] }),
            number: () => schema.shape[key] = z.number().openapi({ description: data[key] }),
            boolean: () => schema.shape[key] = z.boolean().openapi({ description: data[key] })
        }[typeof schema.shape[key] || 'string']());
    }
    console.log("%c Query plugin: Created Schema: ", "color: lightblue;", schema);
    return schema;
};

// constants
const info = {
    title: 'Gateway Server',
    version: '1.0.0',
};
const baseUrl = "http://localhost:5001";
const apiSchemaName = "GatewayServerSchema";
const openapiDocName = "gateway-server-v1.openapi";

class QueryPlugin {
    apply(compiler) {
        compiler.hooks.done.tap('QueryPlugin', async () => {
            try {
                // Execute your query logic here
                const response = await fetch(`${baseUrl}/api/v1/serverSchema`);
                let data = await response.json();
                console.log("server-schema: Query plugin ", data);

                // Remove duplicates
                const uniqueRoutes = data
                    .filter((route, index, self) => index === self
                        .findIndex((t) => (t.path === route.path))
                    );

                console.log("%c Query plugin: removed duplicates: ", "color: lightblue;", uniqueRoutes, "\nFormatting Data...");
                const constructedRoutes = uniqueRoutes
                    .filter(({ path }) => !["/", "/*"].includes(path))
                    .map(async ({ path, method }) => {

                        console.log("%c Query plugin: Formatting: ", "color: lightblue;", method, path);
                        // format key from endpoint. camelCase last part of path
                        const pathPieces = path.split("/");
                        let key = pathPieces[pathPieces.length - 1].replace(":", "");

                        if (key.includes("-") || key.includes("_")) {
                            const tempKey = key.replace("-", "_");
                            const [firstKeyPiece, secondKeyPiece] = tempKey.split("_");
                            key = firstKeyPiece + (secondKeyPiece.charAt(0).toUpperCase() + secondKeyPiece.slice(1));
                        };

                        const endpoint = path.includes('/api/v1')
                            ? path.split("/api/v1")[1]
                            : path;


                        const formattedEndpoint = ({
                            [key]: endpoint.includes(":")
                                ? endpoint.split(":")[0]
                                : endpoint
                        });

                        let zodSchema = {};
                        try {
                            // console.log("%c Query plugin: Formatted endpoint: ", "color: lightblue;", formattedEndpoint, "\nBuilding Zod Schema...");
                            // const resource = endpoint.split(":")[0];
                            // const response = await fetch(baseUrl + resource);
                            // const responseJson = await response.json();
                            // zodSchema = responseJson
                            //     ? await new Promise((resolve) => resolve(convertToZodSchema(responseJson).openapi(responseJson)))
                            //     : {};
    
                            // console.log("%c Query plugin: Awaited Zod Schema: ", "color: lightblue;", zodSchema, "\nBuilding OpenAPI Schema...");
                            
                        } catch (error) {
                            console.error(error);
                        }

                        return ({
                            path: formattedEndpoint,
                            openapiRoute: {
                                [endpoint]: {
                                    [method.toLowerCase()]: {
                                        // for put/post/delete requests
                                        requestParams: {},
                                        requestBody: {
                                            content: {
                                                'application/json': {
                                                    schema: {}
                                                },
                                            }
                                        },
                                        responses: {
                                            200: {
                                                description: 'Success',
                                                content: {
                                                    'application/json': {
                                                        schema: zodSchema
                                                        // schema: {}
                                                    },
                                                },
                                            },
                                            500: {
                                                description: 'Internal server error',
                                                content: {
                                                    'application/json': {
                                                        schema: z
                                                            .string()
                                                            .openapi({ description: "Something went wrong. Internal server error" }),
                                                    },
                                                },
                                            },
                                            401: {
                                                description: 'Unauthorized',
                                                content: {
                                                    'application/json': {
                                                        schema: z
                                                            .string()
                                                            .openapi({ description: "Unauthorized" }),
                                                    },
                                                },
                                            },
                                            404: {
                                                description: 'Not found',
                                                content: {
                                                    'application/json': {
                                                        schema: z
                                                            .string()
                                                            .openapi({ description: "Not found" }),
                                                    },
                                                },
                                            },
                                            400: {
                                                description: 'Bad request',
                                                content: {
                                                    'application/json': {
                                                        schema: z
                                                            .string()
                                                            .openapi({ description: "Bad request" }),
                                                    },
                                                },
                                            },
                                        },
                                    }
                                }
                            }
                        })
                    });

                console.log("%c Query plugin: Promises Schema Complete: ", "color: lightblue;", constructedRoutes, "\nWriting to file...");
                const formattedData = await Promise.all(constructedRoutes);

                console.log("%c Query plugin: Awaited Schema Promises: ", "color: lightblue;", formattedData, "\nWriting to file...");

                const schemaJson = Object.assign({}, ...formattedData.map(({ path }) => path));

                // Path to save the file
                const filePath = path.join(__dirname, `../src/utilities/api/${apiSchemaName}.json`);

                const fileContent = JSON.stringify(schemaJson, null, 2);

                // Write the data to the file as a JS module
                fs.writeFileSync(filePath, fileContent, 'utf8');
                console.log(fileContent, `Data written to ${filePath} as JavaScript module`);

                const openApiData = Object.assign({}, ...formattedData.map(({ openapiRoute }) => openapiRoute));
                console.log("Generated OpenAPI Data: ", openApiData);
                const document = createDocument({
                    openapi: '3.1.0',
                    info,
                    paths: openApiData
                });
                console.log("Generated OpenAPI Document: ", openApiData);
                fs.writeFileSync(path.join(__dirname, `/${openapiDocName}.json`), JSON.stringify(document, null, 2));

                return data;

            } catch (error) {
                console.error("Error fetching or writing data: ", error);
            }
        });
    }
}

module.exports = QueryPlugin;
