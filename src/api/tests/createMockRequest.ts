import { Agent, MockAgent, setGlobalDispatcher } from 'undici'
import { fetcher } from '../api'

/**
 * Подробно от том как работает мок
 * @see https://undici.nodejs.org/#/docs/api/MockAgent
 */
export const createMockRequest = (
    operationName: string,
    disableNetConnect: boolean
) => {
    const mockAgent = new MockAgent({ connections: 2 })
    const client = mockAgent.get(fetcher.origin)
    const request = client.intercept({
        method: 'POST',
        path: '/graphql',
        query: {
            operationName,
        },
    })
    const clear = async () => {
        setGlobalDispatcher(new Agent())
        await client.close()
    }
    setGlobalDispatcher(mockAgent)

    if (disableNetConnect) {
        mockAgent.disableNetConnect()
    }

    return { request, clear }
}
