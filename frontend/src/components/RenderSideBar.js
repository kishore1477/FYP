import React from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from '../scenes/global/Sidebar';
import EmployeeSidebar from '../scenes/global/EmployeeSidebar';

const RenderSideBar = () => {
    const { state } = useLocation();
    const isAdmin = state?.isAdmin;
    const location = useLocation();
    const hideNavbar = location.pathname;

    console.log("isAdmin in side", isAdmin, hideNavbar);

    return hideNavbar === '/login' ? <></> : hideNavbar === '/' ? <></> : hideNavbar.startsWith('/employee/') ? <EmployeeSidebar /> : <Sidebar />;
};

export default RenderSideBar;
