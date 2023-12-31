// Import the functions you need from the SDKs you need
import React,{useState,useEffect, useContext, createContext} from 'react'
import { initializeApp } from "firebase/app";
import {User, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB9ZmrQ-CLq7SFz15tJ0r5axnGfMNbG1VM",
  authDomain: "netflix-clone-19f67.firebaseapp.com",
  projectId: "netflix-clone-19f67",
  storageBucket: "netflix-clone-19f67.appspot.com",
  messagingSenderId: "384565395336",
  appId: "1:384565395336:web:10ecad9a5d497da351c43d",
  measurementId: "G-KW0FMXJG9R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)

export type AuthContextType =ReturnType<typeof useProvideAuth>

const  AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider=({
    children,
}:{
    children:React.ReactElement | React.ReactElement[]
})=>{
    const auth = useProvideAuth()
    return <AuthContext.Provider value={auth} >{children}</AuthContext.Provider>

}

export const useAuth = ()=>useContext(AuthContext) ?? {} as AuthContextType


const  useProvideAuth= () => { 
    // current user =>null
        const [user, setUser] = useState<User | null>(auth.currentUser)
        const [loading,setLoading]= useState(true)
        useEffect(() => {
            const unsubscribe =onAuthStateChanged(auth,(user)=>{
                setLoading(false)
              setUser(user)
            });
            return ()=>{
                unsubscribe()
            }
        }, [])
        const signup =(email:string , password:string)=> createUserWithEmailAndPassword(auth,email,password).then(({user})=>
        {
            
            return user
        })
        const signIn =(email:string , password:string)=> signInWithEmailAndPassword(auth,email,password).then(({user})=>
        {
           
            return user
        })
        const signoutUser =  ()=>signOut(auth)
        return {
            signIn,
            signOut:signoutUser,
            signup,
            user,
            loading
        }
     }




// const analytics = getAnalytics(app);