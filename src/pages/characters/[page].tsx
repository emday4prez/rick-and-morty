import { useState } from 'react'
import { useRouter } from 'next/router'
import { useQuery } from '@tanstack/react-query'
import { fetcher } from '../../utils/fetch'
import Image from 'next/image'
import Link from 'next/link'
import {
    ArrowLongLeftIcon,
    ArrowLongRightIcon,
} from '@heroicons/react/20/solid'

export default function Characters(props) {
    const [page, setPage] = useState(1)
    const router = useRouter()
    const { status, data } = useQuery({
        queryKey: ['characters'],
        queryFn: () =>
            fetcher(
                `https://rickandmortyapi.com/api/character/?page=${router.query.page}`
            ),
        initialData: props.characters,
    })
    if (status === 'loading') return <p>loading...</p>
    if (status === 'error') return <p>Error:</p>

    return (
        <div className="flex flex-col">
            <h2>Characters</h2>
            <ul
                role="list"
                className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
            >
                {props.characters.map((person: any) => (
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
                                        {person.species}
                                    </span>
                                </dd>
                            </dl>
                        </div>
                        <div>
                            {/* <div className="-mt-px flex divide-x divide-gray-200">
                                <div className="flex w-0 flex-1">
                                    <a
                                        href={`mailto:${person.email}`}
                                        className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                                    >
                                        <EnvelopeIcon
                                            className="h-5 w-5 text-gray-400"
                                            aria-hidden="true"
                                        />
                                        Email
                                    </a>
                                </div>
                                <div className="-ml-px flex w-0 flex-1">
                                    <a
                                        href={`tel:${person.telephone}`}
                                        className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                                    >
                                        <PhoneIcon
                                            className="h-5 w-5 text-gray-400"
                                            aria-hidden="true"
                                        />
                                        Call
                                    </a>
                                </div>
                            </div> */}
                        </div>
                    </li>
                ))}
            </ul>

            <nav className="flex items-center justify-between border-t border-gray-200 px-4 sm:px-0">
                <div
                    onClick={() => setPage((old) => Math.max(old - 1, 0))}
                    // disabled={page === 0}
                    className="-mt-px flex w-0 flex-1"
                >
                    <a
                        href="#"
                        className="inline-flex items-center border-t-2 border-transparent pr-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                    >
                        <ArrowLongLeftIcon
                            className="mr-3 h-5 w-5 text-gray-400"
                            aria-hidden="true"
                        />
                        Previous
                    </a>
                </div>
                <div className="hidden md:-mt-px md:flex">
                    <a
                        href="#"
                        className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                    >
                        1
                    </a>
                    {/* Current: "border-indigo-500 text-indigo-600", Default: "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300" */}
                    <a
                        href="#"
                        className="inline-flex items-center border-t-2 border-indigo-500 px-4 pt-4 text-sm font-medium text-indigo-600"
                        aria-current="page"
                    >
                        2
                    </a>
                    <a
                        href="#"
                        className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                    >
                        3
                    </a>
                    <span className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500">
                        ...
                    </span>
                    <a
                        href="#"
                        className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                    >
                        40
                    </a>
                    <a
                        href="#"
                        className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                    >
                        41
                    </a>
                    <a
                        href="#"
                        className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                    >
                        42
                    </a>
                </div>
                <div className="-mt-px flex w-0 flex-1 justify-end cursor-pointer">
                    <div className="inline-flex items-center border-t-2 border-transparent pl-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700">
                        Next
                        <ArrowLongRightIcon
                            className="ml-3 h-5 w-5 text-gray-400"
                            aria-hidden="true"
                        />
                    </div>
                </div>
            </nav>
        </div>
    )
}

export async function getServerSideProps({ params }) {
    const { page } = params
    const charactersResponse = await fetcher(
        `https://rickandmortyapi.com/api/character/?page=${page}`
    )

    return {
        props: {
            characters: charactersResponse.results,
        },
    }
}
