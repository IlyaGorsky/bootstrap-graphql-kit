import React from 'react'
import { fetchFirst2Query } from '../_generated_/first2.query.generated'
import type { EpisodeListFragment } from '../_generated_/episodeList.fragment.generated'
import { notEmpty } from '../notEmpty'

const Episodes = () => {
    const [episodes, setEpisodes] = React.useState<EpisodeListFragment[]>([])
    const handleClickLoadButton = async () => {
        const { data } = await fetchFirst2Query({ page: 1 })
        const episodes = data?.episodes?.results?.filter(notEmpty)
        episodes && setEpisodes(episodes)
    }

    return (
        <ul>
            {episodes.map((episode) => (
                <li key={episode.name}>{episode.name}</li>
            ))}
            {!episodes.length && (
                <button role="button" onClick={handleClickLoadButton}>
                    show episodes
                </button>
            )}
        </ul>
    )
}

export default Episodes
