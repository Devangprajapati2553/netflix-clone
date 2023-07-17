import React from 'react'
import LogoImage from '../assets/logo.png'
import {Link,NavLink} from 'react-router-dom'

const Header = () => {

    const IsActiveLink =  ({ isActive }:{ isActive:boolean })  =>{
        return  isActive ? "font-semibold text-white" :"" ;
    }   
    

  return <header className=' border-b py-2'>
    <nav className='grid grid-cols-[200px_auto_200px] items-center gap-4 '>
        <section className='h-12 '>
            <Link to="/browse">
            <img src={LogoImage} className='h-full w-full object-contain' alt='netflix logo'/>
            </Link>
        </section>
        <section className='text-sm font-thin text-gray-300'>
            <ul className='flex gap-4'>
                <li>
                    <NavLink to="/browse" className={IsActiveLink}>Home</NavLink>
                    </li>
                    <li>
                    <NavLink to="/browse/genre" className={IsActiveLink} >TV Shows</NavLink>
                   </li>
                   <li>
                    <NavLink to="/browse/genre" className={IsActiveLink} >Movies</NavLink>
                    </li>
                    <li>
                    <NavLink to="/latest" className={IsActiveLink} >New & Popular</NavLink>
                </li>
            </ul>
        </section>
        <section>
                Search Icon
                user Info
             </section>
    </nav>
  </header>
}

export default Header