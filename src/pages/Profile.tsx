
import Profiles from './Profiles';

const Profile = ({edit=false}: {edit?:boolean}) => {
  return(<>
    <article className='grid min-h-screen place-content-center'>
      <Profiles edit={edit}/>
    </article>
       <section className='h-20 '></section>
       </>
  )


}
export default Profile


