export default {
    paths: {
        "openfitness": "/openfitness",
        "openfitnessTables": "/openfitness/fitness_tables",
        "appConfig": "/app",
        // "mfeMetadata": "/familyapps/mfe_metadata",
    },
    host: {
        baseURL: ("process.env.CLIENT_HOSTNAME" + "/api/v1"),
        headers: {}
    }
};