import axios from "axios";
import apiConfig from "./api.config";

// todo: write an npx command to add paths
const paths = {
    "example": "/example",
    "notionTest": "/notion/Home",
    "schema": '/database/api/read_schema',
    "database": '/database/',
    "chat": "/chat/generate",
    "generateImage": "/stability/generate",
    "ocr": "/camera/analyze-image",
    "portfolio": "/notion/portfolio",
    "notion": "/notion",
    "graphql": "http://localhost:4000",
    "host": process.env.CLIENT_HOSTNAME,
    ...apiConfig.paths
};

const client = axios.create({
    // todo: capture CLIENT_HOSTNAME when using the setup script
    // baseURL: (process.env.CLIENT_HOSTNAME + "/api/v1"),
    // baseURL: paths.host,
    baseURL: (paths.host + "/api/v1"),
    // baseURL: "",
    headers: {},
});

const graphClient = axios.create({
    baseURL: paths.graphql,
    headers: {},
});

// general app queries
const queries = ({
    // General Query to use any query with a passed queryPath
    query: (queryPath: string, payload?: any, method?: string) => ({
        queryKey: [queryPath],
        queryFn: async () => payload 
            ? (await (client as any)[method || "post"](queryPath, payload)).data
            : (await (client as any)[method || "get"](queryPath)).data
    }),
    graphQuery: (queryPath: string, payload?: any, method?: string) => ({
        queryKey: ["graphql", queryPath],
        queryFn: async () => payload 
            ? (await (graphClient as any)[method || "post"](queryPath, payload)).data
            : (await (graphClient as any)[method || "get"](queryPath)).data
    }),
});

export { client, paths, queries };
