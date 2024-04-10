import path from 'node:path'
import fs from 'node:fs'
import {
    getIntrospectionQuery,
    buildClientSchema,
    printSchema,
    IntrospectionQuery,
    GraphQLSchema,
} from 'graphql'

import { Fetcher } from '../../client/fetcher'

const fetcher = new Fetcher('https://rickandmortyapi.com/graphql')

async function fetchSchema() {
    const { data } = await fetcher.query<
        IntrospectionQuery,
        { operationName: 'IntrospectionQuery' }
    >(getIntrospectionQuery(), { operationName: 'IntrospectionQuery' })

    if (data) {
        console.log('✅', 'download schema introspection')
        return buildClientSchema(data)
    }
}

function printClientSchema(data: GraphQLSchema): string {
    const schema = printSchema(data)
    console.log('✅', 'print client schema')
    return schema
}

function writeSchema(dist: string, schema: string) {
    const output = path.resolve(process.cwd(), dist)
    fs.writeFileSync(output, schema)
    console.log('✅', 'write schema file', dist)
}

function printFile(schema?: GraphQLSchema) {
    if (!fs.existsSync('./.codegen')) {
        fs.mkdirSync('./.codegen')
    }
    if (schema) {
        writeSchema('./.codegen/schema.graphql', printClientSchema(schema))
    }
}

fetchSchema()
    .then(printFile)
    .then(() => console.log('✅', 'success create schema.graphql'))
    .catch((e) =>
        console.error('❌', 'failed create schema.graphql', 'error:', e)
    )
