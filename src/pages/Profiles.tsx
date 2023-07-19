import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import PencilIcon from '@heroicons/react/24/outline/PencilIcon' 
import PlusIcon from '@heroicons/react/24/outline/PlusCircleIcon' 
import Model from '../component/Model';
import { ProviderId } from 'firebase/auth';
const Profiles = ({edit}: {edit:boolean}) => {
const [isProfileEditorOpen, setIsProfileEditorOpen] = useState(false)


  const navigate = useNavigate()
  const ManageProfile =() => { 
    navigate('/ManageProfiles')
   }

   const CloseEditor =() => { 
        setIsProfileEditorOpen(false)
    }

        const OpenEditor = () => { 
            setIsProfileEditorOpen(true)
         }


  const heading  =edit ? " Who's watching? ": "Manage Profile"
  return (
    <>
      <h1 className='mb-8 text-5xl'> {heading}</h1>
      <section className='flex gap-4 '>
      <ProfileCard onEditClick={OpenEditor} edit={edit}/>
      <ProfileCard onEditClick={OpenEditor} edit={edit}/>
      
        <AddProfile/>
      </section>
      {edit? <>
        <ProfileButton>Done</ProfileButton>
        <EditProfile edit={edit} isOpen={isProfileEditorOpen} title="" onClose={CloseEditor} />

      </>: <ProfileButton onClick={ManageProfile} className='mt-8' buttonType='secondary'>Manage Profiles</ProfileButton>}
    </>
  );
}

const ProfileButton=({
   buttonType = "primary",
  ...props
}:{
  buttonType?:"primary" | "secondary";
} & React.HTMLAttributes<HTMLButtonElement>) =>{
return <button {...props} className={`${buttonType ==="primary" ? "bg-gray-100 text-dark hover:bg-netFlixRed hover:text-white":"border border-white text-gray-400 hover:text-white"} py-2 flex   w-fit  px-4 text-xl ${props.className}`}>{props.children}</button>
}



export default Profiles



const ProfileCard = ({edit,onEditClick}: {edit:boolean,onEditClick:()=>void}) => { 
    return (
      <section className='flex flex-col place-items-center gap-2 text-gray-400 hover:text-white'>
        <section className='relative  h-[10vw] w-[10vw] max-h-[200px] max-w-[200px] min-h-[84px] min-w-[84px] overflow-hidden rounded-md hover:border-4 hover:border-gray-100 '>
          <img src="/ProfilePic.jpg" alt="User Profile image " />
          {edit ? <button className='absolute inset-0 bg-black/50 grid place-items-center' onClick={onEditClick}>
            <PencilIcon className='w-[25%] text-white'/>

          </button>:null}
        </section>
        <h1 className='text-xl'>Profile Name</h1>
      </section>
    )


 }


 const AddProfile = () => { 
   return  <section className='flex cursor-pointer flex-col place-items-center gap-2 text-gray-200'>
        <section className='grid place-items-center h-[10vw] w-[10vw] max-h-[200px] max-w-[200px] min-h-[84px] min-w-[84px] overflow-hidden rounded-md border-gray-100 hover:border-4 hover:bg-gray-400'>
        <PlusIcon  className="w-[65%]    "/>
        </section>
    </section>
  }


  const EditProfile =(props:{
    isOpen:boolean;
    onClose:(value:boolean)=>void;
    title:string;
    edit?:boolean
  }) => { 
const heading  = props.edit ? "Edit Profile":"Add Profile"
const cancelEdit =() => { 
    props.onClose(false)
 }
    return <Model {...props}>

        <section className='h-screen w-screen'>
            <section className='mx-auto my-16 max-w-4xl'>
        <h1 className='mb-4 text-6xl'>{heading}</h1>
<section className='grid grid-cols-[200px_auto] gap-4  border-t border-b  p-4 text-gray-100'>
<section className='aspect-square overflow-hidden rounded-md'>
    <img src="/ProfilePic.jpg" alt="Profile image" />
</section>
<section>
    <input type="text" placeholder='Enter name for the profile' className='w-full bg-zinc-500 p-2 outline-none' />
</section>
</section>
<section className='mt-8 flex gap-4'>
    <ProfileButton>Save</ProfileButton>
    <ProfileButton buttonType='secondary' onClick={cancelEdit}>Cancel</ProfileButton>
</section>
            </section>
        </section>
    </Model>
   }