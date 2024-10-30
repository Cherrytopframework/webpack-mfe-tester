export const getOpenfitnessTablesSchemaQuery = `
query OpenfitnessTablesSchema {
    openfitnessTablesSchema {
        table
        columns {
            name
            notNull
            primaryKey
            isUnique
            uniqueName
            dataType
            columnType
        }
    }
}
`;