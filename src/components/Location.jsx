function Location({ id }) {
    const { data, status } = useQuery({
        queryKey: ['location', id],
        queryFn: () => fetch(`https://rickandmortyapi.com/api/location/${id}`),
    })

    if (status === 'pending') return <p>Loading...</p>
    if (status === 'error') return <p>Error </p>

    return (
        <>
            {data.name} - {data.type}
        </>
    )
}

export default Location
