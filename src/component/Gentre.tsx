
import { ENDPOINT } from '../common/endpoints'
import ContentRow from './content-rows'
import Banner from './Banner'

const Gentre = () => {
  return (
    <section  className='absolute top-0 h-full '>
    <Banner type={ENDPOINT.TV_SERIAL}/>
      <ContentRow endpoint={ENDPOINT.TV_SERIAL} title = "Genre" />
     
  </section>
  )
}

export default Gentre