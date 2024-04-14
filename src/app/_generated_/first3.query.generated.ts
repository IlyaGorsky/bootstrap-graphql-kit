import * as Types from '../../../types/schema'

import { gql } from '@/gql'
import { fetcher as fetcher } from '../../api/api'
import { useQuery } from '@tanstack/react-query'

export type First3QueryVariables = Types.Exact<{
    filterName: Types.Scalars['String']['input']
}>

export type First3Query = { __typename: 'Query' } & {
    characters?: Types.Maybe<
        { __typename: 'Characters' } & {
            results?: Types.Maybe<
                Array<
                    Types.Maybe<
                        { __typename: 'Character' } & Pick<
                            Types.Character,
                            'name' | 'status'
                        >
                    >
                >
            >
        }
    >
}

export const First3Document = gql(
    `query First3($filterName: String!) {
  characters(filter: {name: $filterName}) {
    results {
      name
      status
      __typename
    }
    __typename
  }
  __typename
}`,
    []
)
export const fetchFirst3Query = (v: First3QueryVariables) =>
    fetcher.query(First3Document, v)

export const mockFirst3Query = (
    resolve: (v: First3QueryVariables) => First3Query
) => resolve

mockFirst3Query.operationName = 'First3' as const

export const useFirst3Query = (
    v: First3QueryVariables,
    enabled: boolean = true
) =>
    useQuery({
        queryFn: () => fetcher.query<First3Query>(First3Document, v),
        queryKey: ['First3', v],
        enabled,
    })
