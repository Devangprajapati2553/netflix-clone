import  { useEffect, useRef, useState } from 'react'
import ChevronDown from '@heroicons/react/24/outline/ChevronDownIcon'

import { useAuth } from '../common/auth'
import { Link, useNavigate } from 'react-router-dom'
import { useProfilesContext, useProfilesDispatchContext } from './ProfileContext'
import { UserProfile } from '../common/types'


const ProfileMenu = () => {
    const {signOut} = useAuth()
    
    const [showMenu, setShowMenu] = useState(false)
    const profileMenuContainer =useRef<HTMLElement>(null)
    const timerId =useRef(0)
    const navigate= useNavigate()
    const userProfiles = useProfilesContext();
    const dispatch= useProfilesDispatchContext()
    const currentProfile = userProfiles?.profiles.find(profile=>profile.id===userProfiles.selectedProfileId)
const OnMouseEnter= () => { 
    if (timerId.current) {
            clearTimeout(timerId.current)
    }
        setShowMenu(true)
 }

 const OnMouseExit =() => { 
    timerId.current=window.setTimeout(() => {
        setShowMenu(false)
    }, 300);
  } 

    useEffect(() => {
    profileMenuContainer.current?.addEventListener("mouseenter",OnMouseEnter)
    profileMenuContainer.current?.addEventListener("mouseleave",OnMouseExit)

    return ()=>{
        profileMenuContainer.current?.removeEventListener("mouseenter",OnMouseEnter)
        profileMenuContainer.current?.removeEventListener("mouseleave",OnMouseExit)
    }
    }, [])

    const SungOutNetflix =async() => {
        await signOut()
        dispatch({type:"load",payload:null})
        navigate('/login')
      }

      const LoadProfile =(profile:UserProfile) => { 
                dispatch({type:"current" ,payload:profile})
                window.location.reload();
       }
    
  return (
    <section ref={profileMenuContainer} className='relative'>
        <section className='flex items-center gap-2 '>
           <img src={currentProfile?.imageUrl} alt="User Profile Image"
            className='h-10 w-10 rounded-md'
           />
            <ChevronDown
                style={{strokeWidth:".2rem"}}
            className={`h-6 w-6 transition-transform duration-200 ${showMenu ? "rotate-180":""}`}/>
        </section>
        {showMenu ? (
            <ul className='absolute -left-24 top-[60px] flex w-[200px] flex-col gap-4 bg-dark justify-center px-4 py-2 '>
                    {userProfiles?.profiles.filter(profile=>profile.id !==currentProfile?.id)?.map((profile)=><li key={profile.id}
                     onClick={()=> LoadProfile(profile)} 
                     
                     className='flex cursor-pointer items-center gap-2 hover:underline'>
                        <img src={profile.imageUrl} alt={profile.name} className='h-8 w-8 ' />
                        {profile.name}</li>)}
            
                <li className={(userProfiles?.profiles.length ?? 0 ) > 1 ? ` -mx-4 border-t border-t-gray-500 px-4  pt-2`:""}>
                    <Link to="/ManageProfiles" className='hover:underline'>Manage Profile</Link>
                    </li>
                <li>Transfer Profile</li>
                <li> Account</li>
                <li> Help Center</li>
                <li onClick={SungOutNetflix} className='-mx-4 border-t border-t-gray-500 px-4  pt-2 hover:underline'>Sign Out  Of NetFlix</li>
            </ul>
        ):null}
    </section>
  )
}

export default ProfileMenu