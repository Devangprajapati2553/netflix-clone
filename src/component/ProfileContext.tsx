import React, { createContext, useContext, useEffect, useReducer } from 'react'
import { ActionType, ProfileContextType } from '../common/types';
import { useAuth } from '../common/auth';
import ProfileReducer from '../reducer/profileReducer';


type StoredProfiles = Map<string, ProfileContextType>

const LOCAL_STORAGE_KEY = "profiles"
const ProfileContext = createContext<ProfileContextType | null>(null)





const ProfileDispachContext = createContext<React.Dispatch<ActionType> | null>(null)
const ProfilesProvider = ({ children }: { children: React.ReactElement }) => {

    const { user } = useAuth()
    const userProfiles = findProfile(user?.email as string)
    const [state, dispatch] = useReducer(ProfileReducer, userProfiles)
    useEffect(() => {
        if (user?.email) {
            if (state) {
                
                const StoredProfiles = getProfiles()
                StoredProfiles.set(user.email, state as ProfileContextType)
                updateProfiles(StoredProfiles)
        } else {
            dispatch({ type: "load", payload: userProfiles })
        }
    }
    }, [user?.email,state])
    return <ProfileContext.Provider value={state}>
        <ProfileDispachContext.Provider value={dispatch}>
            {children}
        </ProfileDispachContext.Provider>
    </ProfileContext.Provider>
}

export default ProfilesProvider


const getProfiles = (): StoredProfiles => {
    const storedData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || 'null');
  
    if (storedData === null) {
      return new Map<string, ProfileContextType>();
    }
  
    if (Array.isArray(storedData)) {
      return new Map<string, ProfileContextType>(storedData);
    }
  
    // Handle the case where `storedData` is not an array.
    return new Map<string, ProfileContextType>();
  };
  
  
const findProfile = (id: string) => {
    const profiles = getProfiles()
    return id ? profiles.get(id) ?? null : null
}

const updateProfiles = (profiles: StoredProfiles) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(Array.from(profiles)))
}

export const useProfilesContext =()=> useContext(ProfileContext)
export const useProfilesDispatchContext =()=> useContext(ProfileDispachContext) as React.Dispatch<ActionType>