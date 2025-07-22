import { createContext, useContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import PropTypes from 'prop-types';
const AuthContext = createContext()

export const useAuth = ()=>{
    return useContext(AuthContext)
}
const googleProvider = new GoogleAuthProvider();
// authProvider 

export const AuthProvider = ({children}) =>{
    const [currentUser,setCurrentUser] = useState(null)
    const[loading,setLoading] = useState(true)

// register the use 

    const registerUser = async(email,password)=>{
        return await createUserWithEmailAndPassword(auth,email,password)
    }

    // login the user 


    const loginUser = async(email,password)=>{
        return await signInWithEmailAndPassword(auth,email,password)
    }
// signup with google account 

const signInWithGoogle = async()=>{
return await signInWithPopup(auth,googleProvider)
}

const logoutUser = async()=>{
return signOut(auth)
}

// manage user 

useEffect(()=>{
 const unsubscribe = onAuthStateChanged(auth,(user)=>{
    setCurrentUser(user)
    setLoading(false)
    if(user){
        const {email,displayName,photoURL} = user;
        const userData = {
            email,username:displayName,photo:photoURL
        }
    }
 })
 return ()=> unsubscribe()
},[])

    const value = {
        currentUser,
        registerUser,
        loginUser,
        signInWithGoogle,
        logoutUser,
        loading
    }
   return (
    <AuthContext.Provider value={value}>
    {children}
   </AuthContext.Provider>
   )
}


AuthProvider.propTypes = {
    children: PropTypes.node, // Accepts anything that can be rendered
  };