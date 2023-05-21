import { useRouter } from 'next/router'
import { useQuery } from '@tanstack/react-query'
import { fetcher } from '../../utils/fetch'
export default function Episode() {
    const router = useRouter()
    const epId = router.query.number

    const { status, data } = useQuery({
        queryKey: ['episode', epId],
        queryFn: () =>
            fetcher(`https://rickandmortyapi.com/api/episode/${epId}`),
    })

    if (status === 'loading')
        return (
            <p className="flex flex-col min-h-screen items-center justify-center">
                Loading...
            </p>
        )
    if (status === 'error') return <p>Error :</p>
    const { season, episode } = getSeasonAndEpisode(data.episode)
    return (
        <div className="min-h-screen flex flex-col items-center justify-center">
            <div>
                <div>
                    <h2 className="text-4xl">{data.name}</h2>
                    <h3 className="text-2xl">
                        Season {season} - Episode {episode}
                    </h3>
                    <h4 className="">Original Air Date: {data.air_date}</h4>
                </div>
            </div>
        </div>
    )
}

function getSeasonAndEpisode(seasonEpisode: string) {
    const seArray = seasonEpisode.split('E')

    const season = seArray[0].at(-1)
    const episode = seArray[1]

    return { season, episode }
}
