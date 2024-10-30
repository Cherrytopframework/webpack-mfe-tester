import { getAppConfigQuery } from "./getAppConfigQuery";
import { getOpenfitnessQuery } from "./getOpenfitnessQuery";
import { getOpenfitnessTablesSchemaQuery } from "./getOpenfitnessTablesSchemaQuery";

// todo: Build Supergraph from each of these subgraphs
// ...Splitting the queries up by the location of their servers
const supabaseGraph = {
    getOpenfitnessTablesSchemaQuery
};

const frameworkGraph = {
    getAppConfigQuery,
    getOpenfitnessQuery,
};

const graphqlQueries = {
    frameworkGraph,
    supabaseGraph
};

export { graphqlQueries };
