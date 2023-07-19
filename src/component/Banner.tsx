import React, { useEffect, useState } from 'react'
import { FetchVideoInfo, MovieResponse, MovieResult, MovieVideoInfo, fetchRequest } from '../common/api'
import { ENDPOINT } from '../common/endpoints'
import { createImageUrl } from '../common/utils'
import YouTube,{YouTubeEvent, YouTubeProps} from 'react-youtube'
import PlayIcon from '@heroicons/react/24/solid/PlayCircleIcon'
import Info from '@heroicons/react/24/outline/InformationCircleIcon'


const Banner = () => {
const [randomMovie, setRandomMovie] = useState<MovieResult>()
const [videoInfo, setVideoInfo] = useState<MovieVideoInfo>()
const [hidePoster, setHidePoster] = useState(false)
const [showBackDrop, setShowBackDrop] = useState(false)
  const options : YouTubeProps["opts"]= {
    width:document.body.clientWidth,
    height:"800",
    playerVars: {
        autoplay:1,
        playsinline:1,
        controls:1
  }
}
const  getRandomIndex  =(last:number) => { 
    return Math.floor(Math.random()* (last-1))
 }
 const FetchPopularMovie = async() => { 
        const response = await fetchRequest<MovieResponse<MovieResult[]>>(ENDPOINT.MOVIES_POPULAR)
            const filteredMovie=response.results.filter(movie=>movie.backdrop_path)
        // setRandomMovie( filteredMovie[getRandomIndex(filteredMovie.length)])

        const randomSelection = filteredMovie[getRandomIndex(filteredMovie.length)]
        setRandomMovie(randomSelection)

        


          const videoInfo = await FetchVideoInfo(randomSelection.id.toString())
          setVideoInfo(videoInfo[0])
          setTimeout(() => {
            setHidePoster(true)
          }, 800);
        }

        useEffect(() => {
         FetchPopularMovie()
        //void aapde add karyu che
        }, [])
        
        const OnStateChange = (event: YouTubeEvent<number>) => { 
          if (event.data ===0) {
            setHidePoster(false)
            setShowBackDrop(true)
          }else if(event.data===1){
            setHidePoster(true)
            setShowBackDrop(false)

          }
         }

  return (
   randomMovie?( <section className='relative aspect-video h-[800px] w-full'>
      <img src={createImageUrl(randomMovie?.backdrop_path as string ,0,"original")} alt={randomMovie?.title} className={hidePoster ? `h-0 invisible`: `h-full w-full visible`}  />
      {videoInfo  ? (<YouTube videoId={videoInfo?.key} id='banner-video' opts={options}
      onStateChange={OnStateChange}
      className={`${!hidePoster ? "h-0 invisible" : "h-full w-full visible "} absolute z-[2] -mt-14`   }
      />):null}
{showBackDrop ?      <section className='absolute z-[1] top-0 left-0 w-full h-full bg-dark/60'></section>:null}
      <section className='z-[1] absolute bottom-16 ml-16 max-w-sm flex  flex-col gap-2'>
        <h2 className='text-6xl'>{randomMovie.title}</h2>
        <p className='text-sm line-clamp-3'>{randomMovie.overview}</p>
        <section className='flex gap-2'>
          <button className='flex w-[100px] items-center rounded-md bg-white p-2 text-dark '>
              <PlayIcon className='h-8 w-8 '/> <span>Play</span>
          </button>
          <button className='flex w-[150px] items-center rounded-md bg-zinc-400/50 p-2 text-white '>
              <Info className='h-8 w-8 '/> <span>More Info</span>
          </button>


        </section>
      </section>
    </section>) :null
  )
}

export default Banner