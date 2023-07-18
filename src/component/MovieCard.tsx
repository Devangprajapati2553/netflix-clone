import React, { MouseEvent, useEffect, useRef, useState } from 'react'
import { createImageUrl } from '../common/utils'
import Model from './Model'
import YouTube from 'react-youtube'
import { fetchRequest } from '../common/api'
import { ENDPOINT } from '../common/endpoints'
import PlayIcon from '@heroicons/react/24/solid/PlayCircleIcon'
import LikeIcon from '@heroicons/react/24/outline/HandThumbUpIcon'
import PlusIcon from '@heroicons/react/24/outline/PlusIcon'
import ChevronDown from '@heroicons/react/24/outline/ChevronDownIcon'
import { Position } from '../common/types'

type MovieCardProp = {
    poster_path:string,
    id:number,
    title:string
}

export type MovieVideoResult<T> = {
        id: number
        results: T
        [k: string]: unknown
}

export type MovieVideoInfo={
    
        iso_639_1: string
        iso_3166_1: string
        name: string
        key: string
        site: string
        size: number
        type: string
        official: boolean
        published_at: string
        id: string
        [k: string]: unknown
      
}




const MovieCard = ({poster_path,id,title}: MovieCardProp) => {
   const [isOpen, setIsOpen] = useState(false)
   const [hidePoster, setHidePoster] = useState(false)
   const [position, setPosition] = useState<Position | null>(null)
const [videoInfo, setVideoInfo] = useState<MovieVideoInfo| null>(null)
   const movieCardRef = useRef<HTMLSelectElement>(null)


        const FetchVideoInfo= async() => {
                const response = await fetchRequest<MovieVideoResult<MovieVideoInfo[]>>(ENDPOINT.MOVIES_VIDEO.replace("{movie_id}",id.toString()))
                return response.results.filter((result)=>result.site.toLowerCase()==="youtube")
                
        }
const onClose = (value:boolean) => {
    setIsOpen(false)
}

const CloseModel= () => {
    setIsOpen(false)
}
const onMouseEnter = async(event:any) => {
    const [videoInfo] =await FetchVideoInfo() 
    let calculatedPosotion = movieCardRef.current?.getBoundingClientRect()
        console.log({calculatedPosotion});
        let top = (calculatedPosotion?.top?? 0) -100;
        let left  = (calculatedPosotion?.left?? 0)-100;
        if (left<0) {
            left = calculatedPosotion?.left as number
        }
        let totalWidth =left + 470 
        if (totalWidth >document.body.clientWidth) {
                left= left - (totalWidth - document.body.clientWidth)
        }

        setPosition({top,left})

 setVideoInfo(videoInfo)
    setIsOpen(true)
}

useEffect(() => {
    movieCardRef.current?.addEventListener('mouseenter',onMouseEnter);
    ()=> movieCardRef.current?.removeEventListener('mouseenter',onMouseEnter)
}, [])

useEffect(() => {
  if (videoInfo?.key) {
    setTimeout(() => {
        setHidePoster(true)
    }, 800);
  }
  if (!isOpen) {
        setHidePoster(false)
  }

}, [videoInfo,isOpen])



  return (
    <>
           <section className=" flex-none aspect-square overflow-hidden rounded-md" key={id} ref={movieCardRef}>
                <img
                  src={createImageUrl(poster_path)}
                  className={`w-[200px] aspect-square object-contain`}
                  alt={title}
                />
              </section>
              <Model closeModel={CloseModel} isOpen={isOpen} key={id} onClose={onClose}  title={""} position={position}>
                <section className='aspect-square transition-[height]  duration-500 ease-in'>
            <img src={createImageUrl(poster_path)} alt={title} className={`${hidePoster ? "invisible h-0":"visible h-[300px]"}  w-full   `} />

           <YouTube opts={{
            width:"400",
            height:"300",
            playerVars: {
                autoplay:1,
                playsinline:1,
                controls:0
            }
           }} videoId={videoInfo?.key }
           className={`${!hidePoster ? "invisible h-0":"visible h-fit"}  w-full   `}
           />
           <section className='flex  items-center justify-between p-6'>
            <ul className='flex items-center justify-evenly gap-4'>
                <li className='h-12 w-12    '>
                     <button className='h-full w-full' >
                          <PlayIcon/>
                     </button>

                </li>
                <li className='h-12 w-12   rounded-full border-2 border-gray-500 p-2 hover:border-white '>
                     <button className='h-full w-full' >
                          <PlusIcon/>
                     </button>

                </li>
                <li className='h-12 w-12   rounded-full border-2 border-gray-500 p-2 hover:border-white  '>
                     <button className='h-full w-full' >
                          <LikeIcon/>
                     </button>

                </li>
                <li className='h-12 w-12  rounded-full border-2 border-gray-500 p-2 hover:border-white   '>
                     <button className='h-full w-full' >
                          <ChevronDown/>
                     </button>

                </li>

                    
            </ul>



           </section>
                </section>

          </Model>
    </>
  )
}

export default MovieCard
