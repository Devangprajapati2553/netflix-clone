import React from 'react'
import { useNavigate } from 'react-router-dom';
import Profiles from './Profiles';

const Profile = ({edit=false}: {edit?:boolean}) => {
  return(
    <article className='grid min-h-screen place-content-center'>
      <Profiles edit={edit}/>
    </article>
  )


}
export default Profile


