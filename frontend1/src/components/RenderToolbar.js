import React from 'react'
import { useLocation } from 'react-router-dom';
import Topbar from '../scenes/global/Topbar';

const RenderToolbar = () => {
    const location = useLocation();
    const hideNavbar = location.pathname ;
    // const hideNavbar = location.pathname === '/login' || '/';
  console.log("hideNavbar1", !hideNavbar)
    return hideNavbar === '/login' ?<></>:hideNavbar === '/'?<></>:  <Topbar  />
}

export default RenderToolbar