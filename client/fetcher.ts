import type { Query } from './types'
import { request } from './request'

export class Fetcher {
    public origin: string
    public url: string

    constructor(url: string) {
        const graphql = new URL(url)
        this.url = graphql.toString()
        this.origin = graphql.origin
    }

    query<D extends object, V extends object = object>(q: Query, v?: V) {
        return request(this.url)<D,V>(q, v)
    }
    
    mutation<D extends object, V extends object = object>(q: Query, v?: V) {
        return request(this.url)<D,V>(q, v)
    }
}
