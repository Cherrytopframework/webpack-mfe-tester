import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
    schema: 'https://swapi-graphql.netlify.app/.netlify/functions/index',
    documents: ['src/**/*.tsx'],
    ignoreNoDocuments: true,
    generates: {
        './src/utilities/api/graphql/': {
            preset: 'client',
            config: {
                documentMode: 'string'
            }
        },
        './schema.graphql': {
            plugins: ['schema-ast'],
            config: {
                includeDirectives: true
            }
        }
    }
}

export default config