import * as Types from '../../../types/schema'

import { gql } from '@/gql'

export type EpisodeListFragment = { __typename: 'Episode' } & Pick<
    Types.Episode,
    'name'
>

export const EpisodeListFragmentDoc = gql(
    `fragment episodeList on Episode {
  name
}`,
    []
)
