/* eslint-disable no-useless-catch */
import { type ASTNode, type OperationDefinitionNode, Kind } from 'graphql'
import type { RequestFn, Query, Variables, Response } from './types'
import axios from 'axios'

const isOperation = (node: ASTNode): node is OperationDefinitionNode =>
    node.kind === Kind.DIRECTIVE_DEFINITION

const getOperationName = (node: ASTNode): string | undefined =>
    isOperation(node) ? node.name?.value : undefined

const request: RequestFn = async <D extends object, V extends object>(
    url: string,
    query: Query,
    variables?: Variables<V>
): Promise<Response<D>> => {
    try {
        const operationName =
            typeof query === 'string'
                ? undefined
                : getOperationName(query.definitions[0])
        const api = new URL(url)
        const params = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        }
        operationName && api.searchParams.append('operationName', operationName)

        const { data } = await axios.request<Response<D>>({
            url: api.toString(),
            data: JSON.stringify({
                query:
                typeof query === 'string' ? query : query.loc?.source.body,
                variables: variables ?? null,
                operationName,
            }),
            ...params,
        })

        return data
    } catch (e) {
        throw e
    }
}

export { request }
