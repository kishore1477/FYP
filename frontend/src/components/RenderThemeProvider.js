import React from 'react'
import { CssBaseline, ThemeProvider } from "@mui/material";
import { useLocation } from 'react-router-dom';
import { useMode } from '../theme';
const RenderThemeProvider = () => {
    const [theme, colorMode] = useMode();
    const location = useLocation();
    const hideNavbar = location.pathname === '/'|| '/login';
  
    return !hideNavbar &&    <ThemeProvider theme={theme}/>
}

export default RenderThemeProvider