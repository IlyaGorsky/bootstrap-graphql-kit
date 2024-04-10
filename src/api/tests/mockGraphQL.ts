/* eslint-disable @typescript-eslint/no-explicit-any */
import  type { ResolveFn } from './types'
import { createMockRequest } from './createMockRequest'

const mockGraphQL = (operationName: string, disableNetConnect = true) => {
    const { request, clear } = createMockRequest(
        operationName,
        disableNetConnect
    )

    return {
        reply<T extends (...args: any[]) => object>(
            resolver: ResolveFn<T>
        ) {
            request.reply(function replyHandler(props) {
                const body = typeof props.body === 'string'
                ? JSON.parse(props.body)
                    : undefined

                return {
                    statusCode: 200,
                    data: { data: resolver(body?.variables ?? undefined) },
                }
            })
        },
        replyWithError: <S extends number, E extends object>(
            status: S,
            error: E
        ) => request.reply(status, error),
        clear,
    }
}

export default mockGraphQL


if (process.env.NODE_ENV === 'test') {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { fetch } = require('undici')
    globalThis.fetch = fetch
}
