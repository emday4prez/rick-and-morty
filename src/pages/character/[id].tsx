import { useQuery } from '@tanstack/react-query'
import { fetcher } from '../../utils/fetch'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Episode from '../../components/Episode'
import Location from '../../components/Location'
type Character = {
    id: number
    name: string
    status: 'Alive' | 'Dead' | 'unknown'
    species: string
    type: string | null
    gender: 'Female' | 'Male' | 'Genderless' | 'unknown'
    origin: {
        name: string
        url: string
    }
    location: {
        name: string
        url: string
    }
    image: string
    episode: string[]
    url: string
    created: string
}

type CharactersProps = {
    character: Character
}

export default function Character(props: CharactersProps) {
    const router = useRouter()
    const id = router.query.id
    const { status, data } = useQuery({
        queryKey: ['character', id],
        queryFn: () =>
            fetcher(`https://rickandmortyapi.com/api/character/${id}`),
    })

    if (status === 'loading')
        return (
            <p className="flex flex-col min-h-screen items-center justify-center">
                Loading...
            </p>
        )
    if (status === 'error') return <p>Error :</p>

    const locationUrlPars = data.location.url.split('/').filter(Boolean)
    const locationId = locationUrlPars[locationUrlPars.length - 1]

    return (
        <div className="flex flex-col min-h-screen items-center justify-center">
            <div className="overflow-hidden bg-white shadow sm:rounded-lg">
                <div className="px-4 py-6 sm:px-6">
                    <Image
                        className="mx-auto h-32 w-32 flex-shrink-0 rounded-full"
                        src={data.image}
                        height={300}
                        width={300}
                        alt=""
                    />
                </div>
                <div className="border-t border-gray-100">
                    <dl className="divide-y divide-gray-100">
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-900">
                                Full name
                            </dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                {data.name}
                            </dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-900">
                                Last Known Location
                            </dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                <Location id={locationId} />
                            </dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-900">
                                Status
                            </dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                {data.status}
                            </dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-900">
                                Species
                            </dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                {data.species}
                            </dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-900">
                                Origin
                            </dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                {data.origin.name}
                            </dd>
                        </div>

                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium leading-6 text-gray-900">
                                Episode
                            </dt>
                            <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                <ul
                                    role="list"
                                    className="divide-y divide-gray-100 rounded-md border border-gray-200"
                                >
                                    {data.episode.map(
                                        (ep: string, i: number) => {
                                            const episodeUrlParts = ep
                                                .split('/')
                                                .filter(Boolean)
                                            const episodeId =
                                                episodeUrlParts[
                                                    episodeUrlParts.length - 1
                                                ]
                                            return (
                                                <Episode
                                                    id={episodeId}
                                                    key={`episode-${episodeId}`}
                                                />
                                            )
                                        }
                                    )}

                                    <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6"></li>
                                </ul>
                            </dd>
                        </div>
                    </dl>
                </div>
            </div>
        </div>
    )
}
