import React from 'react'
import ContentRow from './content-rows'
import { ENDPOINT } from '../common/endpoints'
import Banner from './Banner'

const Popular = () => {
  return (
    <section  className='absolute top-0 h-full '>
    <Banner type={ENDPOINT.MOVIES_POPULAR}/>
      <ContentRow endpoint={ENDPOINT.MOVIES_POPULAR} title = "New & Popular" />
     
  </section>
  )
}

export default Popular