
import { createBrowserRouter, createRoutesFromElements, Link, Navigate, Outlet, Route, RouterProvider } from 'react-router-dom'
import './App.css'
import MainLayout from './layouts/MainLayout'
import Browse from './pages/Browse'
import Login from './pages/Login'
import { AuthProvider, useAuth } from './common/auth'

import Profile from './pages/Profile'
import React from 'react'
import ProfilesProvider from './component/ProfileContext'
import Popular from './component/Popular'
import Gentre from './component/Gentre'
import Movies from './component/Movies'
import Registration from './pages/registration'
import Loader from './component/Loader'
import HelpCenter from './pages/HelpCenter'

const ProtectedRoute = ({ children }: { children: React.ReactElement }) => {
  const { user, loading } = useAuth()

  if (!user && !loading) {
    return <Navigate to="/login" />
  }
  return children
}

const RouteError = () => { 
  return <article className='grid place-content-center gap-2 p-4'>
    <h1 className='text-4xl '>the page you are looking doesn't exits</h1>
  <p className='text-2xl'>Browse more content <Link to="/browse" className='text-netFlixRed'>here</Link></p>
  </article>
 }

function AppRouter() {
  const { loading } = useAuth()
  const router = createBrowserRouter(createRoutesFromElements(
    <>
      <Route path='/' element={<ProtectedRoute><Outlet /></ProtectedRoute>}    >
        <Route index element={<Profile />} />
        <Route path='/ManageProfiles' element={<Profile edit />} errorElement={<RouteError/>}/>
        <Route path='/helpcenter' element={<HelpCenter  />} />
        <Route path='browse' element={<MainLayout />}    >
          <Route index element={<Browse />} />
        <Route path=':id' element={<Browse />} />
        

          {/* <Route path='genre' element={<Gentre />} /> */}
          <Route path='Movies' element={<Movies />} />
        </Route>
        <Route path='genre' element={<MainLayout />} >
        <Route index element={<Gentre />} />
          
          </Route>



        <Route path='latest' element={<MainLayout />}    >
          <Route index element={<Popular />} />
        </Route>
      </Route>
      <Route path='/login' element={<Login />} />
      <Route path='/signUp' element={<Registration />} />
    </>
  ))

  return loading ? (<Loader/>) : <RouterProvider router={router}></RouterProvider>
}


function App() {

  return (
    <AuthProvider>
      <ProfilesProvider>
        <AppRouter />
      </ProfilesProvider>
    </AuthProvider>
  )


}

export default App

