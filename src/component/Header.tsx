import React,{useState,useEffect} from 'react'
import LogoImage from '../assets/logo.png'
import {Link,NavLink} from 'react-router-dom'
import NotificationIcon from '@heroicons/react/24/outline/BellIcon'
import SearchBar from './SearchBar'
import ProfileMenu from './ProfileMenu'

const Header = () => {
    const [fixed, setFixed] = useState(false)

    const IsActiveLink =  ({ isActive }:{ isActive:boolean })  =>{
        return  isActive ? "font-semibold text-white" :"" ;
    }   

    const onWindowScroll = () => { 
       if (window.scrollY > 8) {
            setFixed(true)    
       } else{
        setFixed(false)
       }

     }


    useEffect(() => {
      window.addEventListener("scroll",onWindowScroll)
    }, [])
    
    

  return <header className={`  py-2  pr-16 z-10 ${fixed ? "fixed top-0 bg-dark ":" relative bg-transparent "} 
    transition-colors duration-300 ease-linear w-full
  `}>
    <nav className='grid grid-cols-[200px_auto_auto] items-center gap-4 '>
        <section className='h-14 '>
            <Link to="/browse">
            <img src={LogoImage} className='h-full w-full object-contain' alt='netflix logo'/>
            </Link>
        </section>
        <section className='text-base font-normal text-gray-300'>
            <ul className='flex gap-8'>
                <li>
                    <NavLink to="/browse" className={IsActiveLink}>Home</NavLink>
                    </li>
                    <li>
                    <NavLink to="/browse/genre" className={IsActiveLink} >TV Shows</NavLink>
                   </li>
                   <li>
                    <NavLink to="/browse/Movies" className={IsActiveLink} >Movies</NavLink>
                    </li>
                    <li>
                    <NavLink to="/latest" className={IsActiveLink} >New & Popular</NavLink>
                </li>
            </ul>
        </section>
        <section className='flex item-center justify-self-end gap-4'>
                <SearchBar/>
                <NotificationIcon className='h-8 w-8'/>
                <ProfileMenu/>
             </section>
    </nav>
  </header>
}

export default Header