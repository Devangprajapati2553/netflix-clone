
import {ENDPOINT} from '../common/endpoints'
import ContentRow from '../component/content-rows'
import Banner from '../component/Banner'
import { useParams } from 'react-router-dom'


const Browse = () => {

  const params=useParams()
  console.log(params.id,"id ");
 
    
      
  
  return (
    <section  className='absolute top-0'>
      <Banner type={ENDPOINT.MOVIES_POPULAR}/>
     
        <ContentRow endpoint={ENDPOINT.MOVIES_POPULAR} title = "New & Popular" />
        <ContentRow endpoint={ENDPOINT.MOVIES_TOP_RATED} title = "Top Rated" />
        <ContentRow endpoint={ENDPOINT.MOVIES_NOW_PLAYING} title = "Now Playing" />
       <section className='h-20 '></section>
    </section>
  
  )
}

export default Browse