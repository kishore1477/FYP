import React, { useState, useContext } from 'react'
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios'
import {  useDispatch } from 'react-redux'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Container, Typography } from '@mui/material';
import { setToken } from '../redux/slice/authenticationSlice';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()
  const dispatch = useDispatch()
const {state} = useLocation()
const isAdmin = state?.isAdmin
console.log("state", state)
  const apiUrl = process.env.REACT_APP_backend_url
  console.log("apiUrl", apiUrl)
  const validationSchema = Yup.object({
    registerId: Yup.string()
      .required('Required'),
    password: Yup.string()
      .min(7, 'Password must be at least 8 characters')
      .required('Required'),
  })
  const { handleChange, handleSubmit, values, errors, touched } = useFormik({
    initialValues: {
      registerId: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async(values, { resetForm }) => {
       
      try {
        const  {registerId,password} = values
        setLoading(true);
        const url = `${apiUrl}/auth/login`
        console.log('url',url)
        const postData = {
         
          registerationID:registerId ,password
        }
        const res = await axios.post(url,postData)
        console.log("res",res)
        if(res.status === 200){
          setLoading(false);
          toast.success(res.data.message, {
            position: 'top-right', // 'top-right', 'bottom-right', 'bottom-center', 'bottom-left'
          })
          const jwtToken  = res?.data?.loginToken
          localStorage.setItem('jwtToken', jwtToken);
          dispatch(setToken(jwtToken));
          resetForm()
          navigate('/dashboard')
        }else{
          setLoading(false);
          toast.error(res.data.message)
        }
      } catch (error) {
        setLoading(false);
        toast.error(error.response.data.message)
      }

    },
  });
  return (
    <div className="relative flex flex-col items-center justify-center h-screen">
      {/* Video background */}
      <video autoPlay loop muted className="fixed inset-0 w-full h-full object-cover z-[-1] opacity-50">
        <source src="/homeVideo.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Content within the container */}
      <Container maxWidth="lg" className="relative z-10 text-white h-full md:h-96  flex flex-col justify-center p-14">
        {/* Transparent background for the container */}
        <div className="absolute inset-0 bg-[#221917] opacity-70"></div>

        {/* Content */}
        <div className="relative ">
          <div className='flex flex-col md:flex-row gap-4'>
            <div className=' w-full md:w-1/2 flex   justify-center'>
              <div className="flex flex-col items-center justify-center text-center">
                <img src="/agiDenium.png" className="rounded" alt="Image 1" />
                <h1 className="text-xl my-2">Welcome to the {isAdmin?'Admin':'Employee'} portal</h1>
                <hr className='text-white p-2 w-full ' />
                {isAdmin?<></>:<img src="/FFaq.png" className="rounded cursor-pointer" alt="Image 2" />}
                
              </div>

            </div>
            <div className='w-full  md:w-1/2'>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div className='relative'>
                  <label htmlFor="registerId" className="block mb-2 text-xl font-medium text-red-900 ">Employee RegistrationNo:</label>
                  <input
                    type="text"
                    name="registerId"
                    id="logregisterId"
                    className="bg-gray-50 border-none text-gray-900 sm:text-sm block w-full p-2.5 dark:placeholder-gray-400 pr-3 pl-10 focus:outline-none"
                    placeholder="✉ name@company.com"
                    onChange={handleChange}
                    value={values.registerId}
                  />


                  {touched.registerId && errors.registerId ? (
                    <div className='text-red-500'>{errors.registerId}</div>
                  ) : null}

                </div>
                <div className='relative'>
                  <label htmlFor="registerId" className="block mb-2 text-xl font-medium text-red-900 ">Password:</label>
                  <input
                    type="password"
                    name="password"
                    id="logPass"
                    placeholder=" 🔑 ••••••••"
                    className="bg-gray-50 border-none text-gray-900 sm:text-sm  focus:outline-none focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-none dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 pr-3 pl-10"
                    onChange={handleChange}
                    value={values.password}
                  />

                  {touched.password && errors.password ? (
                    <div className='text-red-500'>{errors.password}</div>
                  ) : null}


                </div>
                <div className="flex items-center justify-between">
                  <button type="submit" className="w-1/3 text-white bg-purple-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" disabled={loading}> {loading ? 'Signing in ...' : 'Sign in'}</button>
                  <Link to='/forgotPassword'>
                    <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
                  </Link>
                </div>

              </form>
            </div>
          </div>
          {/* Add other content here */}
        </div>
      </Container>
    </div>
  );
}

export default Login;