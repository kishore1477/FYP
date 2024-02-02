import React from 'react'
import { useLocation } from 'react-router-dom';
import Sidebar from '../scenes/global/Sidebar';

const RenderSideBar = () => {

    const location = useLocation();
    const hideNavbar = location.pathname 
  
    return hideNavbar === '/login' ?<></>:hideNavbar === '/'?<></>: <Sidebar />
}

export default RenderSideBar