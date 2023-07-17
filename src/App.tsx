
import { createBrowserRouter,createRoutesFromElements,Route,RouterProvider } from 'react-router-dom'
import './App.css'
import MainLayout from './layouts/MainLayout'
import Browse from './pages/Browse'

  function AppRouter()  {
     const router = createBrowserRouter(createRoutesFromElements(
      <>
      <Route  path='/' element={<div>Default View </div>}    />
      <Route  path='/login' element={<div>Login </div>}    />
      <Route  path='/browse' element={<MainLayout/>}    >
      <Route  index element={<Browse/>}    />
      </Route>
      <Route  path='/latest' element={<MainLayout/>}    >
      <Route  index element={<h1>Latest </h1>}    />
      </Route>
      </>
  ))

  return <RouterProvider router={router}></RouterProvider>
  }
  

function App() {

  return    <AppRouter/>
    
  
}

export default App

