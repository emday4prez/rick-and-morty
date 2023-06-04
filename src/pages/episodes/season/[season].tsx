import { fetcher } from '../../../utils/fetch'
export default function Season({ episodes, season }: any) {
    return (
        <>
            {episodes && (
                <div>
                    <h2>Season {season}</h2>
                    <div>
                        {episodes.map((episode: any) => {
                            return <div key={episode.id}>{episode.name}</div>
                        })}
                    </div>
                </div>
            )}
        </>
    )
}

export async function getServerSideProps({ params }: any) {
    const { season } = params
    const seasonResponse = await fetcher(
        `https://rickandmortyapi.com/api/episode/1,2,3,4,5,6,7,8,9,10,11`
    )

    return {
        props: {
            episodes: seasonResponse,
            season,
        },
    }
}
