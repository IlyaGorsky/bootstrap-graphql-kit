import * as Types from '../../../types/schema'

import gql from 'graphql-tag'
import { EpisodeListFragmentDoc } from './episodeList.fragment.generated'
import { fetcher as fetcher } from '../../api/api'
import { useQuery } from '@tanstack/react-query'

export type First2QueryVariables = Types.Exact<{
    page?: Types.InputMaybe<Types.Scalars['Int']['input']>
}>

export type First2Query = { __typename: 'Query' } & {
    episodes?: Types.Maybe<
        { __typename: 'Episodes' } & {
            results?: Types.Maybe<
                Array<
                    Types.Maybe<
                        { __typename: 'Episode' } & Pick<Types.Episode, 'name'>
                    >
                >
            >
            info?: Types.Maybe<
                { __typename: 'Info' } & Pick<Types.Info, 'next'>
            >
        }
    >
}

export const First2Document = gql`
    query First2($page: Int = 1) {
        episodes(page: $page) {
            results {
                name
                ...episodeList
                __typename
            }
            info {
                next
                __typename
            }
            __typename
        }
        __typename
    }
    ${EpisodeListFragmentDoc}
`
export const fetchFirst2Query = (v?: First2QueryVariables) =>
    fetcher.query<First2Query>(First2Document, v ?? {})

export const mockFirst2Query = (
    resolve: (v?: First2QueryVariables) => First2Query
) => resolve

mockFirst2Query.operationName = 'First2' as const

export const useFirst2Query = (
    v?: First2QueryVariables,
    enabled: boolean = true
) =>
    useQuery({
        queryFn: () => fetcher.query<First2Query>(First2Document, v ?? {}),
        queryKey: ['First2', v],
        enabled,
    })
