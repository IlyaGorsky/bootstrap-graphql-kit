import { type ASTNode, type OperationDefinitionNode } from 'graphql'
import type { RequestFn } from './types'

const isOperation = (node: ASTNode): node is OperationDefinitionNode => node.kind === 'OperationDefinition'

const getOperationName = (node: ASTNode): string => isOperation(node) ? node.name!.value : 'unknown'

export const request: <U extends string>(url: U) => RequestFn = (url) => async (query, variables) => {
    const isDocumentNode = typeof query !== 'string';
    const operationName = isDocumentNode ? getOperationName(query.definitions[0]) : 'unknown';
    const api = new URL(url)
    const params = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query:isDocumentNode ?query.loc?.source.body : query,
            variables,
            operationName,
        }),
    }
    api.searchParams.append('operationName',operationName)

    const response = await fetch(`${api}`, params)
    const data = await response.json()

    return data
}