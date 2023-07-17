import React,{useEffect, useState} from 'react'
import { MovieResponse, MovieResult, fetchRequest } from '../common/api'
import {ENDPOINT} from '../common/endpoints'
import ContentRow from '../component/content-rows'

const Browse = () => {
    



  return (
  <section>
    <section>
        banner Image
    </section>
    <section >
        <ContentRow endpoint={ENDPOINT.MOVIES_POPULAR} title = "New & Popular" />
        <ContentRow endpoint={ENDPOINT.MOVIES_TOP_RATED} title = "Top Rated" />
        <ContentRow endpoint={ENDPOINT.MOVIES_NOW_PLAYING} title = "Now Playing" />
    </section>
  </section>
  )
}

export default Browse