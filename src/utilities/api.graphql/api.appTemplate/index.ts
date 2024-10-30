import axios from "axios";
import apiConfig from "./api.config.json";
// import generatedApiConfig from "./serverSchema.json";

// const isDevelopment = (process.env.NODE_ENV === "development");
// todo: write an ctf command to add paths
const paths = {
    "graphql": "http://localhost:4000",
    // "host": process.env.CLIENT_HOSTNAME,
    "host": "https://home-server.ngrok.io",
    ...apiConfig.paths,
    // ...generatedApiConfig,
};

const client = axios.create({
    // todo: capture CLIENT_HOSTNAME when using the setup script
    baseURL: (paths.host + paths.proxy),
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
    },
    auth: {
        username: "hono",
        password: "somerandypassw1",
    }
});


const graphqlClient = axios.create({
    // todo: capture CLIENT_HOSTNAME when using the setup script
    baseURL: (paths.host + paths.graphqlproxy),
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
    },
    auth: {
        username: "hono",
        password: "somerandypassw1",
    }
});

// general app queries
const queries = ({
    /**
     * General Query to use any query with a passed queryPath
     * @param {string} queryPath Path to the rest API
     * @param {any} [payload] Payload to send with the query
     * @param {string} [method] HTTP method to use, defaults to "get"
     * @returns {import("react-query").UseQueryOptions} An object suitable for use with the `useQuery` hook
     */
    query: (queryPath: string, payload?: any, method?: string) => ({
        queryKey: [queryPath],
        queryFn: async () => payload 
            ? (await (client as any)[method || "post"](queryPath, payload)).data
            : (await (client as any)[method || "get"](queryPath)).data
    }),
    /**
     * Queries the GraphQL API
     * @param {string} queryPath Path to the GraphQL API
     * @returns {import("react-query").UseQueryOptions} An object suitable for use with the `useQuery` hook
     */
    graphQuery: (query: string) => ({
        queryKey: ["graphql", query],
        queryFn: async () => graphqlClient.post(query),
    }),
});

export { client, paths, queries };
