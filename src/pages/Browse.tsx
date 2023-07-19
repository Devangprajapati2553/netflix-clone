import React,{useEffect, useState} from 'react'
import { MovieResponse, MovieResult, fetchRequest } from '../common/api'
import {ENDPOINT} from '../common/endpoints'
import ContentRow from '../component/content-rows'
import Banner from '../component/Banner'

const Browse = () => {
  return (
    <section  className='absolute top-0'>
      <Banner/>
        <ContentRow endpoint={ENDPOINT.MOVIES_POPULAR} title = "New & Popular" />
        <ContentRow endpoint={ENDPOINT.MOVIES_TOP_RATED} title = "Top Rated" />
        <ContentRow endpoint={ENDPOINT.MOVIES_NOW_PLAYING} title = "Now Playing" />
    </section>
  
  )
}

export default Browse