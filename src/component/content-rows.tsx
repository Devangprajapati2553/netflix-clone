/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useRef, useState } from 'react';
import { MovieResponse, MovieResult, fetchRequest } from '../common/api';
import { ENDPOINT } from '../common/endpoints';
import ChevronLeft from '@heroicons/react/24/outline/ChevronLeftIcon'
import ChevronRight from '@heroicons/react/24/outline/ChevronRightIcon'
import PageIndecator from './PageIndecator';
import MovieCard from './MovieCard';

type RowProp = {
  endpoint: string;
  title: string;
};
const CARD_WIDTH= 200
const ContentRow = ({ title, endpoint }: RowProp) => {
  const [rowData, setRowData] = useState<MovieResult[]>([]);
  const sliderRef = useRef<HTMLSelectElement>(null);
  const containerRef = useRef<HTMLSelectElement>(null)
  const cardsPerPage = useRef(0)
  const [translateX, setTranslateX] = useState(0)
  const [pagesCount, setPagesCount] = useState(0)
  const [currentPage, setCurrentPage] = useState(0)
  const disablePrev = currentPage ===0 
  const disableNext = currentPage + 1=== pagesCount
  const fetchPopularReq = async () => {
    try {
      const response = await fetchRequest<MovieResponse<MovieResult[]>>(endpoint);
      setRowData(response.results);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const createImageUrl = (path: string) => {
    return `${import.meta.env.VITE_BASE_IMAGE_URL}${path}`;
  };

  const onNextClick = () => {
    if (sliderRef.current) {
        let updatedTranslateX = translateX - getTranslateXValue()
      sliderRef.current.style.transform = `translateX(${updatedTranslateX}%)`;  
      setTranslateX(updatedTranslateX)
      setCurrentPage(currentPage+1)
    }
  };

  const PrevClick = () => {
    if (sliderRef.current) {
        let updatedTranslateX = translateX  + getTranslateXValue()
      sliderRef.current.style.transform = `translateX(${updatedTranslateX}%)`;
      setTranslateX(updatedTranslateX)
      setCurrentPage(currentPage-1)
    }
  };

  const getTranslateXValue = () => {
    let translateX = 0
    if (sliderRef.current) {
            translateX  = ((cardsPerPage.current *CARD_WIDTH)/sliderRef.current.clientWidth)*100;
    }
    return translateX
  }


  useEffect(() => {
if (rowData?.length > 0) {
        if (containerRef.current) {
                cardsPerPage.current = Math.floor(containerRef.current.clientWidth/CARD_WIDTH)
            setPagesCount(Math.ceil(rowData.length/cardsPerPage.current))

        }
}
  }, [rowData.length])
  


  useEffect(() => {
    void fetchPopularReq();
  }, []);

  return (
    <section className=" row-container ml-12  hover:cursor-pointer">
      <h2 className=" text-lg">{title}</h2>
    <PageIndecator className='mb-2  opacity-0 transition-opacity duration-300 ease-in' pagesCount={pagesCount} currentPage={currentPage} />
      <section className="relative flex flex-nowrap overflow-hidden mb-8 gap-2" ref={containerRef}>
       {!disablePrev ? <button className="absolute h-full bg-black/25 w-12 opacity-0  transition-opacity duration-300 ease-in" onClick={PrevClick}><ChevronLeft/></button> : null}
      {!disableNext ?   <button className="absolute z-[1] h-full right-0 w-12 bg-black/25  opacity-0 transition-opacity duration-300 ease-in" onClick={onNextClick}>
         <ChevronRight className='text-white '/>
        </button> : null
}
        <section ref={sliderRef} className="flex gap-2 transition-transform delay-700">
          {rowData?.map((row,index) => {
            
           

            return (
              <MovieCard uid={`${row.id}-${title}`} key={`${row.id}-${title}`} {...row}/>
            );
          })}
        </section>
      </section>
    </section>
  );
};

export default ContentRow;
