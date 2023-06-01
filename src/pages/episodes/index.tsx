import Image from 'next/image'
import s1 from '../../images/seasons/1.png'
import s2 from '../../images/seasons/2.png'
import s3 from '../../images/seasons/3.png'
import s4 from '../../images/seasons/4.jpg'
import s5 from '../../images/seasons/5.jpg'
import s6 from '../../images/seasons/6.jpg'

const seasons = [
    {
        id: 1,
        image: s1,
        episodes: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
        url: 'https://rickandmortyapi.com/api/episode/1,2,3,4,5,6,7,8,9,10,11',
    },
    {
        id: 2,
        image: s2,
        episodes: [12, 13, 14, 15, 16, 17, 18, 19, 20, 21],
        url: 'https://rickandmortyapi.com/api/episode/12,13,14,15,16,17,18,19,20,21',
    },
]

function Episodes() {
    return (
        <div className="flex flex-col min-h-screen items-center">
            <h1 className="text-6xl p-10 text-slate-700">episodes</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-5 lg:gap-8 xl:gap-10">
                {seasons.map((season) => {
                    return (
                        <div
                            key={season.id}
                            className="flex flex-col items-center justify-center bg-slate-900 rounded-xl shadow-xl hover:shadow-lg transition-shadow cursor-pointer"
                        >
                            <h2 className="text-xl font-bold text-slate-100 p-2">
                                Season {season.id}
                            </h2>
                            <div>
                                <Image
                                    className="rounded-b-xl"
                                    src={season.image}
                                    alt={`season ${season.id} cover art`}
                                ></Image>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
export default Episodes
