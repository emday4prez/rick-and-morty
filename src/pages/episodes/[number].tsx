import { useRouter } from 'next/router'
import { useQuery } from '@tanstack/react-query'
import { fetcher } from '../../utils/fetch'
export default function Episode() {
    const router = useRouter()
    const id = router.query.id
    const { status, data } = useQuery({
        queryKey: ['episode', id],
        queryFn: () =>
            fetcher(`https://rickandmortyapi.com/api/character/${id}`),
    })
    return <div className="min-h-screen">Episode</div>
}
