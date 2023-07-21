
import { ENDPOINT } from '../common/endpoints'
import ContentRow from './content-rows'
import Banner from './Banner'

const Movies = () => {
  return (
    <section  className='absolute top-0'>
      <Banner type={ENDPOINT.UPCOMING_MOVIES}/>

<ContentRow endpoint={ENDPOINT.UPCOMING_MOVIES} title = "Upcoming Movies" />
    </section>
  )
}

export default Movies