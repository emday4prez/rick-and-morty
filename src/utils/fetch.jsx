export const fetcher = async(...args) => {
 const res = await fetch(...args)
 return await res.json()
}