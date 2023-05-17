import { useQuery } from '@tanstack/react-query'
import { fetcher } from '@/utils/fetch'

function Location({ id }) {
    const { data, status } = useQuery({
        queryKey: ['location', id],
        queryFn: () =>
            fetcher(`https://rickandmortyapi.com/api/location/${id}`),
    })

    if (status === 'loading') return <p>Loading...</p>
    if (status === 'error') return <p>Error </p>

    return (
        <>
            {data.name} --- {data.type}
        </>
    )
}

export default Location
