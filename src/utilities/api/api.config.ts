// import serverApiSchema from "./serverSchema.json";

export default {
    paths: {
        // ...serverApiSchema ? serverApiSchema : {},
        "example": "/example",
        "notionTest": "/notion/Home",
        "schema": '/database/api/read_schema',
        "database": '/database/',
        "chat": "/chat/generate",
        "generateImage": "/stability/generate",
        "ocr": "/camera/analyze-image",
        "portfolio": "/notion/portfolio",
        "notion": "/notion",
        "openfitness": "/openfitness",
        "openfitnessTables": "/openfitness/fitness_tables",
        "appConfig": "/appConfig",
        "commits": "/github/commits",
        "postChat": `/aichat/postChat`,
        "healthCheck": "/healthCheck",
        "files": "/files/",
        "framework": "/files2/framework",
        "serverSchema": "/serverSchema",
        "proxy": "/api/v1/service/framework?endpoint=/api/v1",
        "graphqlproxy": "/api/v1/service/framework?endpoint=/graphql?query="
        // "mfeMetadata": "/familyapps/mfe_metadata",
    },
    host: {
        baseURL: ("process.env.CLIENT_HOSTNAME" + "/api/v1"),
        headers: {}
    }
};