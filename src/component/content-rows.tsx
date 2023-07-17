/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useRef, useState } from 'react';
import { MovieResponse, MovieResult, fetchRequest } from '../common/api';
import { ENDPOINT } from '../common/endpoints';
import ChevronLeft from '@heroicons/react/24/outline/ChevronLeftIcon'
import ChevronRight from '@heroicons/react/24/outline/ChevronRightIcon'

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
    }
  };

  const PrevClick = () => {
    if (sliderRef.current) {
        let updatedTranslateX = translateX  + getTranslateXValue()
      sliderRef.current.style.transform = `translateX(${updatedTranslateX}%)`;
      setTranslateX(updatedTranslateX)
    }
  };

  const getTranslateXValue = () => {
    let translateX = 0
    if (sliderRef.current) {
            translateX  = ((cardsPerPage.current *CARD_WIDTH)/sliderRef.current.clientWidth)*100;
            setPagesCount(Math.ceil(rowData.length/cardsPerPage.current))
    }
    return translateX
  }


  useEffect(() => {
if (rowData?.length > 0) {
        if (containerRef.current) {
                cardsPerPage.current = Math.floor(containerRef.current.clientWidth/CARD_WIDTH)

        }
}
  }, [rowData.length])
  


  useEffect(() => {
    void fetchPopularReq();
  }, []);

  return (
    <section className="row-container ml-12  hover:cursor-pointer">
      <h2 className="mb-2">{title}</h2>
      <ul className='flex  gap-1 mb-4 justify-end items-center pr-4 opacity-0 transition-opacity duration-300 ease-in '>
    {Array(pagesCount).fill(0).map((page,index)=>(
        <li className={`h-[2px] w-3 ${currentPage===index ? "bg-gray-100" : "bg-gray-600"} `} key={index}></li>
    ))}
      </ul>
      <section className="relative flex flex-nowrap overflow-hidden gap-2" ref={containerRef}>
        <button className="absolute h-full bg-black/25 w-12 opacity-0  transition-opacity duration-300 ease-in" onClick={PrevClick}><ChevronLeft/></button>
        <button className="absolute z-[1] h-full right-0 w-12 bg-black/25  opacity-0 transition-opacity duration-300 ease-in" onClick={onNextClick}>
         <ChevronRight className='text-white '/>
        </button>

        <section ref={sliderRef} className="flex gap-2 transition-transform delay-700">
          {rowData?.map((row) => {
            const { id, title, poster_path } = row;
            console.log(row);

            return (
              <section className="flex-none aspect-square overflow-hidden rounded-md" key={id}>
                <img
                  src={createImageUrl(poster_path)}
                  className="w-[200px] aspect-square object-contain"
                  alt={title}
                />
              </section>
            );
          })}
        </section>
      </section>
    </section>
  );
};

export default ContentRow;
