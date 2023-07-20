import React, { useContext } from 'react'
import LogoImage from '../assets/logo.png'
import { AuthContextType, useAuth } from '../common/auth'
import { useNavigate } from 'react-router-dom'


const Login = () => {
    const {signIn}=useAuth()
    const navigate=useNavigate()
    const AuthenticateUser= async(event:React.SyntheticEvent) => { 
        const {email,password} = event.target as typeof event.target & {email: HTMLInputElement; password:HTMLInputElement};
        event.preventDefault();
        const user = await signIn(email.value,password.value)
        if (user) {
            navigate('/')
        }
    }  
  return (
    <>
        <header className='relative z-[1] w-56'>
            <img src={LogoImage} alt="Netflix Logo" className='h-full w-full' />
        </header>
    
    <main>
        <section className='absolute top-0 min-h-screen w-full bg-[url("/coverImage.jpg")] -z-[1] bg-cover'></section>
        <section className='absolute inset-0 bg-gradient-to-b from-zinc-900/50'> </section>
        <form onSubmit={AuthenticateUser} className='relative mx-auto min-h-[70vh] w-[450px] bg-black/75 p-16 rounded-r-lg' >

    <article>
        <h1 className='mb-4 text-4xl'>Sign In</h1>
        <section className='flex flex-col gap-4'>
            <input type="email" name="email" id="email" className='rounded-md bg-zinc-500 p-2 text-gray-300 outline-none' />
            <input type="password" name="password" id="password" className='rounded-md bg-zinc-500 p-2 text-gray-300 outline-none' />
        <button  className='my-8 rounded-md bg-netFlixRed p-2 font-semibold' type='submit'>Sign in</button>
        </section>
        <p>New to Netflix? Sign up now.</p>
    </article>
        </form>
    </main>
    </>
  )
}

export default Login