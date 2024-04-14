/* eslint-disable no-useless-catch */
import { type ASTNode, type OperationDefinitionNode } from 'graphql'
import { print } from '@0no-co/graphql.web'

import type { RequestFn } from './types'

const isOperation = (node: ASTNode): node is OperationDefinitionNode =>
    node.kind === 'OperationDefinition'

const getOperationName = (node: ASTNode): string | undefined =>
    isOperation(node) ? node.name?.value : undefined

const request: <U extends string>(url: U) => RequestFn = (url) => async (query, variables) => {
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
            body: JSON.stringify({
                query:
                    typeof query === 'string' ? query : print(query),
                variables: variables ?? null,
                operationName,
            }),
        }
        operationName && api.searchParams.append('operationName', operationName)

        const response = await fetch(api.toString(), params)
        const data = await response.json()

        if (!response.ok) {
            return Promise.reject({
                data,
                status: response.status,
                statusText: response.statusText,
            })
        }

        return data
    } catch (e) {
        throw e
    }
}

export { request }
