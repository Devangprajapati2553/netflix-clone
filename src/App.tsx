
import { createBrowserRouter,createRoutesFromElements,Navigate,Outlet,Route,RouterProvider } from 'react-router-dom'
import './App.css'
import MainLayout from './layouts/MainLayout'
import Browse from './pages/Browse'
import Login from './pages/Login'
import { AuthProvider, useAuth } from './common/auth'

import Profile from './pages/Profile'
import React, { useEffect, useState } from 'react'

  const ProtectedRoute= ({children}:{children:React.ReactElement}) => {
    const {user}=useAuth()
    // const [isLoggedIn, setIsLoggedIn] = useState(false)

    // useEffect(() => {
    //   if (user) {
    //     setIsLoggedIn(true)
    //   }else{
    //     setIsLoggedIn(false)
    //   }
    // }, [user])    
    // if (!user) {
    //   return <Navigate to = "/login"/>
    // }
    return children
  }

  function AppRouter()  {
     const router = createBrowserRouter(createRoutesFromElements(
      <>
      <Route  path='/' element={<ProtectedRoute><Outlet/></ProtectedRoute>}    >
          <Route index element={<Profile/>}/>
          <Route path='/ManageProfiles' element={<Profile edit/>}/>
      <Route  path='browse' element={<MainLayout/>}    >
      <Route  index element={<Browse/>}    />
      </Route>
      <Route  path='latest' element={<MainLayout/>}    >
      <Route  index element={<h1>Latest </h1>}    />
      </Route>
        </Route>
      <Route  path='/login' element={<Login/>}    />
      </>
  ))

  return <RouterProvider router={router}></RouterProvider>
  }
  

function App() {

  return  (
    <AuthProvider>
    <AppRouter/>
    </AuthProvider>
    )
    
  
}

export default App

