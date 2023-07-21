import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import PencilIcon from '@heroicons/react/24/outline/PencilIcon'
import PlusIcon from '@heroicons/react/24/outline/PlusCircleIcon'
import Model from '../component/Model';

import { useProfilesContext, useProfilesDispatchContext } from '../component/ProfileContext';
import { ActionType, UserProfile } from '../common/types';
const Profiles = ({ edit }: { edit: boolean }) => {
  const [isProfileEditorOpen, setIsProfileEditorOpen] = useState(false)
  const UserProfiles = useProfilesContext()
  const dispatch = useProfilesDispatchContext()
  const [profile, setProfile] = useState<UserProfile>()
  const navigate = useNavigate()
  const ManageProfile = () => {
    navigate('/ManageProfiles')
  }

  const CloseEditor = () => {
    setIsProfileEditorOpen(false)
  }

  const OpenEditor = () => {
    setIsProfileEditorOpen(true)
  }
  const OnProfileClick = (profile: UserProfile) => {
    dispatch({ type: "current", payload: profile })
    if (!edit) {
      
      navigate('/browse');
    }

  }

  const OnEditProfile = (profile: UserProfile) => {
    OpenEditor()
    setProfile(profile)
  }

  const onAddProfile = () => {
    const newProfile: UserProfile = {
      id: "",
      name: "",
      imageUrl: `/profile-${(UserProfiles?.profiles?.length ?? 0) + 1}.jpg`
    }
    OpenEditor()
    setProfile(newProfile)
  }

  const OnsaveProfile = (profile: UserProfile) => {
    const action: ActionType = {
      type: profile.id ? "edit" : "add",
      payload: profile
    }
    dispatch(action)
    setIsProfileEditorOpen(false)
  }
  const OnDeleteProfile = (profile: UserProfile) => {
    dispatch({ type: "delete", payload: profile })
    setIsProfileEditorOpen(false)
  }

  const heading = edit ? " Who's watching? " : "Manage Profile"
  return (
    <>
      <h1 className='mb-8 text-5xl'> {heading}</h1>
      <section className='flex gap-4 '>
        {
          UserProfiles?.profiles?.map((profile) => (

            <ProfileCard key={profile.id} onProfileClick={OnProfileClick} profile={profile} onEditClick={OnEditProfile} edit={edit} />
          ))
        }

        {UserProfiles?.profiles.length ?? 0 < 3 ? <AddProfile onAddProfile={onAddProfile} /> : null}
      </section>
      {profile ? <EditProfile edit={edit} isOpen={isProfileEditorOpen} title="" onClose={CloseEditor} profile={profile} onSave={OnsaveProfile} onDelete={OnDeleteProfile} /> : null}
      {edit ? <>
        <ProfileButton className='mt-8' onClick={() => navigate("/")}>Done</ProfileButton>


      </> : <ProfileButton onClick={ManageProfile} className='mt-8' buttonType='secondary'>Manage Profiles</ProfileButton>}
    </>
  );
}

export default Profiles






export const ProfileButton = ({
  buttonType = "primary",
  ...props
}: {
  buttonType?: "primary" | "secondary";
} & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return <button {...props} className={`${buttonType === "primary" ? "bg-gray-100 text-dark hover:bg-netFlixRed hover:text-white" : "border border-white text-gray-400 hover:text-white"} py-2 flex   w-fit  px-4 text-xl ${props.className}`}>{props.children}</button>
}

const ProfileCard = ({
  edit,
  onEditClick,
  onProfileClick,
  profile
}: {
  edit: boolean,
  onEditClick: (profile: UserProfile) => void;
  onProfileClick: (profile: UserProfile) => void;
  profile: UserProfile
}) => {

  // const editClick = (event: React.SyntheticEvent) => {
  //   event.stopPropagation()
  // }

  const { id, imageUrl, name } = profile

  return (
    <section id={id} onClick={() => onProfileClick(profile)} className='flex flex-col place-items-center gap-2 text-gray-400 hover:text-white'>
      <section className='relative  h-[10vw] w-[10vw] max-h-[200px] max-w-[200px] min-h-[84px] min-w-[84px] overflow-hidden rounded-md hover:border-4 hover:border-gray-100 '>
        <img src={imageUrl} alt={name} />
        {edit ? <button className='absolute inset-0 bg-black/50 grid place-items-center' onClick={() => onEditClick(profile)}>
          <PencilIcon className='w-[25%] text-white' />

        </button> : null}
      </section>
      <h1 className='text-xl'>{name}</h1>
    </section>
  )


}

const AddProfile = ({ onAddProfile }: { onAddProfile: () => void }) => {
  return <section className='flex cursor-pointer flex-col place-items-center gap-2 text-gray-200'>
    <button onClick={onAddProfile} className='grid place-items-center h-[10vw] w-[10vw] max-h-[200px] max-w-[200px] min-h-[84px] min-w-[84px] overflow-hidden rounded-md border-gray-100 hover:border-4 hover:bg-gray-400'>
      <PlusIcon className="w-[65%]    " />
    </button>
  </section>
}


const EditProfile = (props: {
  isOpen: boolean;
  onClose: (value: boolean) => void;
  title: string;
  edit?: boolean,
  profile: UserProfile,
  onSave?: (profile: UserProfile) => void
  onDelete: (profile: UserProfile) => void
}) => {
  const heading = props.profile.id ? "Edit Profile" : "Add Profile"
  const cancelEdit = () => {
    props.onClose(false)
  }
  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    const { profileName } = event.target as typeof event.target & {
      profileName: HTMLInputElement
    }
    if (props.onSave) {
      let profile: UserProfile = {
        name: profileName.value,
        id: props?.profile.id,
        imageUrl: props?.profile.imageUrl
      }
      props.onSave(profile)
    }
  }


  return (
    <Model {...props}>

      <section className='h-screen w-screen'>
        <form onSubmit={onSubmit} className='mx-auto my-16 max-w-4xl'>
          <h1 className='mb-4 text-6xl'>{heading}</h1>
          <section className='grid grid-cols-[200px_auto] gap-4  border-t border-b  p-4 text-gray-100'>
            <section className='aspect-square overflow-hidden rounded-md '>
              <img src={props.profile.imageUrl} alt="Profile image" />
            </section>
            <section>
              <input name='profileName' id='profileName' defaultValue={props.profile.name} type="text" placeholder='Enter name for the profile' className='w-full bg-zinc-500 p-2 outline-none' />
            </section>
          </section>
          <section className='mt-8 flex gap-4'>
            <ProfileButton type="submit">Save</ProfileButton>
            {props.profile.id ? <ProfileButton buttonType='secondary' type="button" onClick={() => props.onDelete(props.profile)}>Delete</ProfileButton> : null}
            <ProfileButton type='button' buttonType='secondary' onClick={cancelEdit}>Cancel</ProfileButton>
          </section>
        </form>

      </section>
    </Model>)
}