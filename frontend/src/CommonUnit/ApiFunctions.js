import React from 'react'
import axios from 'axios'
// axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
// axios.defaults.headers.post['Content-Type'] = 'application/json';
const baseUrl = process.env.REACT_APP_backend_url
const  getApiData= async(url) =>{
  return await axios.get(`${baseUrl}/${url}`,{
    headers :{
      'authorization':localStorage.getItem('jwtToken')
    }
  })

}
const  postApiData= async(url,data) =>{
  return await axios.post(`${baseUrl}/${url}`,data,{
    headers :{
      'authorization':localStorage.getItem('jwtToken')
    }
  })

}


export {
    getApiData, postApiData
}