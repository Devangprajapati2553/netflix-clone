
import { createBrowserRouter,createRoutesFromElements,Navigate,Outlet,Route,RouterProvider } from 'react-router-dom'
import './App.css'
import MainLayout from './layouts/MainLayout'
import Browse from './pages/Browse'
import Login from './pages/Login'
import { AuthProvider, useAuth } from './common/auth'

import Profile from './pages/Profile'
import React, { useEffect, useState } from 'react'
import ProfilesProvider from './component/ProfileContext'
import Popular from './component/Popular'
import Gentre from './component/Gentre'
import Movies from './component/Movies'

  const ProtectedRoute= ({children}:{children:React.ReactElement}) => {
    const {user,loading}=useAuth()
  
    if (!user  && !loading) {
      return <Navigate to = "/login"/>
    }
    return children
  }

  function AppRouter()  {
    const {loading,user}=useAuth()
     const router = createBrowserRouter(createRoutesFromElements(
      <>
      <Route  path='/' element={<ProtectedRoute><Outlet/></ProtectedRoute>}    >
          <Route index element={<Profile/>}/>
          <Route path='/ManageProfiles' element={<Profile edit/>}/>
      <Route  path='browse' element={<MainLayout/>}    >
      <Route  index element={<Browse/>}    />
      <Route  path='genre' element={<Gentre/>}    />
      <Route  path='Movies' element={<Movies/>}    />
      </Route>
      <Route  path='latest' element={<MainLayout/>}    >
      <Route  index element={<Popular/>}    />
      </Route>
        </Route>
      <Route  path='/login' element={<Login/>}    />
      </>
  ))

  return loading && !user ? (<section className='grid place-items-center w-screen h-screen'>Loading...</section>): <RouterProvider router={router}></RouterProvider>
  }
  

function App() {

  return  (
    <AuthProvider>
      <ProfilesProvider>
    <AppRouter/>
      </ProfilesProvider>
    </AuthProvider>
    )
    
  
}

export default App

