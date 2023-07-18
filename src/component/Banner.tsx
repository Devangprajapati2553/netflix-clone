import React, { useEffect, useState } from 'react'
import { MovieResponse, MovieResult, fetchRequest } from '../common/api'
import { ENDPOINT } from '../common/endpoints'

const Banner = () => {
const [randomMovie, setRandomMovie] = useState<MovieResult>()

const  getRandomIndex  =(last:number) => { 
    return Math.floor(Math.random()* (last-1))
 }
 const FetchPopularMovie = async() => { 
        const response = await fetchRequest<MovieResponse<MovieResult[]>>(ENDPOINT.MOVIES_POPULAR)
            const filteredMovie=response.results.filter(movie=>movie.backdrop_path)
        setRandomMovie( filteredMovie[getRandomIndex(filteredMovie.length)])
        }

        useEffect(() => {
        void FetchPopularMovie()
        //void aapde add karyu che
        }, [])
        

  return (
    <section>Banner</section>
  )
}

export default Banner