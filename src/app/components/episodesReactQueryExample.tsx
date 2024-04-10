import React from 'react'
import { useFirst2Query } from '../_generated_/first2.query.generated'
import { EpisodeListFragment } from '../_generated_/episodeList.fragment.generated'
import { notEmpty } from '../notEmpty'

const renderEpisodeItem = (episode: EpisodeListFragment) => <li key={episode.name}>{episode.name}</li>

const EpisodesWithReactQueryExample = () => {
    const [isShowEpisodes, showEpisodes] = React.useState(false);
    const { data: response } = useFirst2Query({ page: 1 }, isShowEpisodes);
    const handleClickShowButton = () => showEpisodes(true)

    return (
        <ul>
            {response?.data?.episodes?.results?.filter(notEmpty).map(renderEpisodeItem)}
            {!isShowEpisodes && (
                <button role="button" onClick={handleClickShowButton}>
                    show episodes
                </button>
            )}
        </ul>
    )
}

export default EpisodesWithReactQueryExample
