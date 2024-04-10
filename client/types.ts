import { type DocumentNode } from 'graphql'

/**
 * @see https://spec.graphql.org/October2021/#sec-Errors.Error-result-format
 */
interface Error {
    message: string
    column: { line: number; column: number }[]
    path: string[]
    [x: string]: unknown
}
/**
 * @see https://spec.graphql.org/October2021/#sec-Errors
 */
interface FailResponse<T> {
    data: T | null
    errors: Error[]
}
/**
 * @see https://spec.graphql.org/October2021/#sec-Response
 */
interface SuccessResponse<T> {
    data: T
    errors: []
}

export type Response<T extends object> = SuccessResponse<T> | FailResponse<T>

export type Query = DocumentNode | string

export type Variables<T extends object> = T

export interface RequestFn {
    <D extends object, V extends object>(
        query: Query,
        variables?: Variables<V>
    ): Promise<Response<D>>
}
