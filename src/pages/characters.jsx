import { useInfiniteQuery } from '@tanstack/react-query'
import Image from 'next/image'
import Link from 'next/link'
function Characters() {
    const fetchCharacters = async ({ pageParam }) => {
        const res = await fetch(
            'https://rickandmortyapi.com/api/character/?page=' + pageParam
        )
        return res.json()
    }
    const {
        data,
        error,
        fetchNextPage,
        hasNextPage,
        isFetching,
        isFetchingNextPage,
        status,
    } = useInfiniteQuery({
        queryKey: ['chars'],
        queryFn: fetchCharacters,
        defaultPageParam: 1,
        getNextPageParam: (lastPage, allPages) => {
            const nextPage = allPages.length + 1
            return nextPage
        },
    })
    return status === 'pending' ? (
        <p className="min-h-screen">Loading Characters...</p>
    ) : status === 'error' ? (
        <p>Error: {error.message}</p>
    ) : (
        <>
            {data?.pages.map((group, i) => (
                <div
                    role="list"
                    className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-7"
                    key={i}
                >
                    {group.results.map((person) => (
                        <li
                            key={person.id}
                            className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow"
                        >
                            <div className="flex flex-1 flex-col p-8">
                                <Link href={`/character/${person.id}`}>
                                    <Image
                                        className="mx-auto h-32 w-32 flex-shrink-0 rounded-sm"
                                        src={person.image}
                                        height={300}
                                        width={300}
                                        alt=""
                                    />
                                </Link>

                                <h3 className="mt-6 text-sm font-medium text-gray-900">
                                    {person.name}
                                </h3>
                            </div>
                        </li>
                    ))}
                </div>
            ))}
            <div className="flex flex-col items-center m-10">
                <button
                    onClick={() => fetchNextPage()}
                    disabled={!hasNextPage || isFetchingNextPage}
                    type="button"
                    className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                    {isFetchingNextPage
                        ? 'Loading more...'
                        : hasNextPage
                        ? 'Load More'
                        : 'Nothing more to load'}
                </button>
            </div>
            <div>
                {isFetching && !isFetchingNextPage ? (
                    <h4 className="min-h-screen">Fetching... </h4>
                ) : null}
            </div>
        </>
    )
}

export default Characters
