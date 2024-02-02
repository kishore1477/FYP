import React from 'react'
import { useDispatch } from 'react-redux'
import { resetAuthenticationSlice } from '../redux/slice/authenticationSlice'
import  { resetUserSlice } from '../redux/slice/userSlice'

const ResetRedux = () => {
    const dispatch =  useDispatch()
    const handleReduxReset = ()=>{
        dispatch(resetAuthenticationSlice())
        dispatch(resetUserSlice())
    }
  return {
    handleReduxReset
  }
}

export default ResetRedux
