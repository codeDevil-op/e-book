import { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {FaGoogle} from 'react-icons/fa'
import { useForm } from 'react-hook-form'
import { useAuth } from '../context/AuthContext'
import { toast } from "react-toastify"
const Register = () => {

  const [message,setMessage] = useState("")

  const {registerUser,signInWithGoogle} = useAuth()
  const navigate = useNavigate()
    const { 
      register, 
      handleSubmit, 
      watch, 
      formState: { errors } 
    } = useForm();
  
  // register user 
    const onSubmit = async(data) => {
      console.log(data);
      try {
        await registerUser(data.email,data.password)
        toast.success("User register Successfully!")
      } catch (error) {
        console.log(error)
        setMessage("Please provide a valid email and password")
      }
      
    }
  
  const handleGoogleSignIn = async()=>{
    try {
      await signInWithGoogle()
      toast.success("Login Successfully!")
      navigate("/")
     } catch (error) {
      console.log(error)
      setMessage("Error While Login via Google Account")
     }
  }
  return (
    <div className="h-[calc(100vh-120px)] flex justify-center items-center">
      <div className="w-full max-w-sm bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-xl font-semibold mb-4">Please Register</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Full Name</label>
            <input
            {...register("name", { required: true })}
             type="name" name="name" id="name"
            placeholder="Full Name"
             className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-sm"
            />
          </div> */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
            <input
            {...register("email", { required: true })} 
            type="email" name="email" id="email"
            placeholder="Email Address"
             className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-sm"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
            <input 
            {...register("password", { required: true })}
            type="password" name="password" id="password"
            placeholder="Enter Password"
             className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-sm"
            />
          </div>
          {
            message && <p className='text-red-500 text-xs italic mb-3'>{message}</p>
          }
          <div>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-6 py-2 rounded focus:outline-none">Sign Up</button>
          </div>
        </form>
        <p className='align-baseline font-medium mt-4 text-sm'>Have an account? please <Link to="/login" className='text-blue-500 hover:text-blue-700'>Login</Link></p>

        {/* google sign in  */}

        <div className='mt-4'>
          <button 
          onClick={handleGoogleSignIn}
          className='w-full flex flex-wrap justify-center items-center gap-1
          bg-secondary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-none focus:outline-none
          '>
            <FaGoogle  className='mr-2'/>
            Sign up with Google
          </button>
        </div>
        <p className='mt-5 text-center text-gray-500 text-sm'>2025 Book Store. All rights reserved.</p>
      </div>
    </div>
  )
}

export default Register