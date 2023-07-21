import GooglePlay from '/Playstore.png'
import AppleStore from '/apple.png'

import { Link } from 'react-router-dom'

const HelpCenter = () => {
  return (
    <section className='max-w-screen-xl mx-auto flex flex-col  justify-center items-start mt-20 gap-5'>
        <h1 className='text-4xl font-semibold'>Download the netflix app: </h1>
        <div className='flex gap-5 items-center '>
           <img src={GooglePlay} alt="" className=' h-24 ' />
           <img src={AppleStore} alt="" className=' h-20 ' />
        </div>
        <h1 className='text-xl'>Questions? <Link to="https://help.netflix.com/en/node/42109#:~:text=From%20the%20Netflix%20app%2C%20go,Customer%20Service%20or%20Contact%20Us."
         className='text-netFlixRed'> Learn How to  contact us from the Netflix app!</Link></h1>
    <hr className='border border-white w-full '/>
    <div className='flex flex-col gap-5'>   
        <h1 className='text-4xl font-semibold'>Call us From any Phone </h1>
        <p className='text-xl'>You will need a Landline or cellular phone service</p>
    </div>
    <button className='border-2 border-white p-2 hover:bg-white hover:border-black hover:text-black hover:font-semibold '><Link to="https://help.netflix.com/en/contactus"
    
    >CALL US</Link></button>
    <hr className='border border-white w-full '/>
    <div className='flex flex-col gap-5'>   
        <h1 className='text-4xl font-semibold'><Link to="https://help.netflix.com/en/interface/chat">Live Chat</Link></h1>
        <p className='text-xl'>You will need an internet or mobile Phone Connection</p>
    </div>
    <button className='border-2 border-white p-2 hover:bg-white hover:border-black hover:text-black hover:font-semibold '>START LIVE CHAT</button>


    
    </section>
  )
}

export default HelpCenter