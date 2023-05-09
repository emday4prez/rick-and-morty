import { useInfiniteQuery } from '@tanstack/react-query'
import Image from 'next/image'
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
        <p>Loading...</p>
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
                                <Image
                                    className="mx-auto h-32 w-32 flex-shrink-0 rounded-full"
                                    src={person.image}
                                    height={300}
                                    width={300}
                                    alt=""
                                />
                                <h3 className="mt-6 text-sm font-medium text-gray-900">
                                    {person.name}
                                </h3>
                                <dl className="mt-1 flex flex-grow flex-col justify-between">
                                    <dt className="sr-only">Gender</dt>
                                    <dd className="text-sm text-gray-500">
                                        {person.gender}
                                    </dd>
                                    <dt className="sr-only">Species</dt>
                                    <dd className="mt-3">
                                        <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                                            {person.origin.name}
                                        </span>
                                    </dd>
                                </dl>
                            </div>
                            <div>
                                <div className="-mt-px flex divide-x divide-gray-200">
                                    <div className="flex w-0 flex-1">
                                        <p className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900">
                                            {person.species}
                                        </p>
                                    </div>
                                    <div className="-ml-px flex w-0 flex-1">
                                        <p className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900">
                                            {person.status}
                                        </p>
                                    </div>
                                </div>
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
                {isFetching && !isFetchingNextPage ? 'Fetching...' : null}
            </div>
        </>
    )
}

export default Characters
