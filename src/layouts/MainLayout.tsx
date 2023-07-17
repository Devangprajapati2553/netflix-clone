import React from 'react'
import Header from '../component/Header'
import {Outlet} from 'react-router-dom'

const MainLayout = () => {
  return (
    <div>

        <Header/>
        <main>
    <Outlet/>
        </main>
        <footer>

        </footer>
    </div>
  )
}

export default MainLayout