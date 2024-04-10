import axios from 'axios'
import { type ASTNode, type OperationDefinitionNode } from 'graphql'
import type { RequestFn } from './types'

const isOperation = (node: ASTNode): node is OperationDefinitionNode => node.kind === 'OperationDefinition'

const getOperationName = (node: ASTNode): string => isOperation(node) ? node.name!.value : 'unknown'

export const request:<U extends string>(url: U) => RequestFn = (url) => async (query, variables) => {
    const isDocumentNode = typeof query !== 'string';
    const operationName = isDocumentNode ? getOperationName(query.definitions[0]) : 'unknown';
    const api = new URL(url)
    operationName && api.searchParams.append('operationName', operationName)

    const { data } = await axios.request({
        url: `${api}`,
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        data: {
            query: isDocumentNode? query.loc?.source.body : query,
            variables: variables ?? null,
            operationName,
        }
    })
    return data
}