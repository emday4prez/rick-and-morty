import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'
import { fetcher } from '@/utils/fetch'
function Episode({ id }) {
    const { data, status } = useQuery({
        queryKey: ['episode', id],
        queryFn: () => fetcher(`https://rickandmortyapi.com/api/episode/${id}`),
    })

    if (status !== 'success') {
        return null
    }

    return (
        <article key={id}>
            <Link href={`/episode/${id}`}>
                <h4>
                    {data.episode}. {data.name} - {data.air_date}
                </h4>
            </Link>
        </article>
    )
}

export default Episode
