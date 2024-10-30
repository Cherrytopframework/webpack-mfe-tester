// const path = require('path');
// const fs = require('fs');
import { client, paths } from '../../utilities/api/index';

export const apiScripts = {
    getSchema: async (data?: any) => {
        try {
            // Execute your query logic here
            if (!data) {
                const response = await client.get(paths.serverSchema);
                let data = response.data;
                console.log("server-schema: Query plugin ", data);
            };

            // Remove duplicates
            const uniqueRoutes = data
                .filter((route: { path: string }, index: number, self: any) => index === self
                    .findIndex((t: { path: string }) => (t.path === route.path))
                );

            data = Object.assign(
                {},
                ...uniqueRoutes
                    .filter(({ path }: { path: string }) => !["/", "/*"].includes(path))
                    .map(({ path }: { path: string }) => {

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

                        return ({
                            [key]: endpoint.includes(":")
                                ? endpoint.split(":")[0]
                                : endpoint
                        });
                    })
            );

            // // Path to save the file
            // const filePath = path.join(__dirname, '/serverSchema.json');

            // const fileContent = JSON.stringify(data, null, 2);

            // // Write the data to the file as a JS module
            // fs.writeFileSync(filePath, fileContent, 'utf8');
            // console.log(fileContent, `Data written to ${filePath} as JavaScript module`);

            return data;

        } catch (error) {
            console.error("Error fetching or writing data: ", error);
        }
    }
};