import React, { useEffect }  from 'react'
import LogoImage from '../assets/logo.png'
import { useAuth } from '../common/auth'
import { Link, useNavigate } from 'react-router-dom'



const Registration = () => {
    const {signup,user}=useAuth()
    const navigate=useNavigate()
    useEffect(() => {
      
if (user) {
    navigate('/')
}
    }, [])

    const RegisterUser= async(event:React.SyntheticEvent) => { 
        const {email,password} = event.target as typeof event.target & {email: HTMLInputElement; password:HTMLInputElement};
        event.preventDefault();
       await signup(email.value,password.value)
       navigate('/login')
    }  
  return (
    <>
        <header className='relative z-[1] w-56'>
            <img src={LogoImage} alt="Netflix Logo" className='h-full w-full' />
        </header>
    
    <main>
        <section className='absolute top-0 min-h-screen w-full bg-[url("/coverImage.jpg")] -z-[1] bg-cover'></section>
        <section className='absolute inset-0 bg-gradient-to-b from-zinc-900/50'> </section>
        <form onSubmit={RegisterUser} className='relative mx-auto min-h-[350px] w-[450px] bg-black/75 p-16 rounded-r-lg' >

    <article className='text-gray-300 '>
        <h1 className='mb-4 text-4xl text-white'>Sign up</h1>
        <section className='flex flex-col gap-4'>
            <input type="email" name="email" id="email" className='rounded-md bg-zinc-500 p-2  outline-none'  placeholder='Enter username'/>
            <input type="password" name="password" id="password" className='rounded-md bg-zinc-500 p-2 text-gray-300 outline-none'  placeholder='Enter passsword'/>
        <button  className='my-8 rounded-md bg-netFlixRed p-2 font-semibold text-white' type='submit'>Sign up</button>
        </section>
        <p >Already have an account?<Link to="/signUp" className="text-white">   Sign in now.</Link></p>
    </article>
        </form>
    </main>
    </>
  )
}

export default Registration