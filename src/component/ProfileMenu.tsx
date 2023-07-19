import React, { useEffect, useRef, useState } from 'react'
import ChevronDown from '@heroicons/react/24/outline/ChevronDownIcon'
import ProfileImage from '/ProfilePic.jpg'


const ProfileMenu = () => {
    const [showMenu, setShowMenu] = useState(false)
    const profileMenuContainer =useRef<HTMLElement>(null)
    const timerId =useRef(0)

const OnMouseEnter= () => { 
    if (timerId.current) {
            clearTimeout(timerId.current)
    }
        setShowMenu(true)
 }
 const OnMouseExit =() => { 
    timerId.current=setTimeout(() => {
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
    
  return (
    <section ref={profileMenuContainer} className='relative'>
        <section className='flex items-center gap-2 '>
           <img src={ProfileImage} alt="User Profile Image"
            className='h-10 w-10 rounded-md'
           />
            <ChevronDown
                style={{strokeWidth:".2rem"}}
            className={`h-6 w-6 transition-transform duration-200 ${showMenu ? "rotate-180":""}`}/>
        </section>
        {showMenu ? (
            <ul className='absolute -left-24 top-[60px] flex w-[200px] flex-col gap-4 bg-dark justify-center px-4 py-2 '>
                <li>username</li>
                <li>Manage Profile</li>
                <li>Transfer Profile</li>
                <li> Account</li>
                <li> Help Center</li>
                <li className='-mx-4 border-t border-t-gray-500 px-4  pt-2'>Sign Out  Of NetFlix</li>
            </ul>
        ):null}
    </section>
  )
}

export default ProfileMenu