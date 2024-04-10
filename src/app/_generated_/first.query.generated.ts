import * as Types from '../../../types/schema'

import gql from 'graphql-tag'
import { fetcher as fetcher } from '../../api/api'
import { useQuery } from '@tanstack/react-query'

export type CharacterCardFragment = { __typename: 'Character' } & Pick<
    Types.Character,
    'id' | 'name'
>

export type FirstQueryVariables = Types.Exact<{ [key: string]: never }>

export type FirstQuery = { __typename: 'Query' } & {
    characters?: Types.Maybe<
        { __typename: 'Characters' } & {
            results?: Types.Maybe<
                Array<
                    Types.Maybe<
                        { __typename: 'Character' } & Pick<
                            Types.Character,
                            'id' | 'name'
                        >
                    >
                >
            >
        }
    >
}

export const CharacterCardFragmentDoc = gql`
    fragment characterCard on Character {
        id
        name
    }
`
export const FirstDocument = gql`
    query First {
        characters {
            results {
                ...characterCard
                __typename
            }
            __typename
        }
        __typename
    }
    ${CharacterCardFragmentDoc}
`
export const fetchFirstQuery = () => fetcher.query<FirstQuery>(FirstDocument)

export const mockFirstQuery = (resolve: () => FirstQuery) => resolve

mockFirstQuery.operationName = 'First' as const

export const useFirstQuery = (enabled: boolean = true) =>
    useQuery({
        queryFn: async () => fetcher.query<FirstQuery>(FirstDocument),
        queryKey: ['First'],
        enabled,
    })
