import { Box, IconButton, useTheme } from "@mui/material";
import { useContext, useEffect } from "react";
import { ColorModeContext, tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";


import * as React from 'react';
// import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
// import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import { useNavigate } from "react-router-dom";
import ResetRedux from "../../CommonUnit/ResetRedux";
import { useDispatch, useSelector } from "react-redux";
import { getApiData } from "../../CommonUnit/ApiFunctions";
import { setUser } from "../../redux/slice/userSlice";
import { toast } from 'react-toastify';
const Topbar = () => {
  const theme = useTheme();
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {user} = useSelector((state) => state?.user)
  const {isAuthenticated} = useSelector((state) => state?.authentication)
const {handleReduxReset} =  ResetRedux()
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleProfileRedirect = ()=>{
    setAnchorEl(null);
    navigate('/profile')
  }
  const handleLogout = () => {
    // Dispatch the clearToken action to remove the token from the Redux store
    handleReduxReset()
    setAnchorEl(null);
    navigate('/login')
    localStorage.removeItem('jwtToken');
  };
  useEffect(()=>{
    const getLoggedUserData = async()=>{
      const url = `auth/loggedUserData`
      try {
        const res = await getApiData(url)
        console.log("logged userData",res)
        if(res.status === 200){
          const userDetails = res.data?.data
          dispatch(setUser(userDetails))
        }else{
          toast.error(res.response.data.msg)
        }
      } catch (error) {
        console.log("error", error)
        toast.error(error.response.data.msg)
      }
 
    }
    if(isAuthenticated){
      getLoggedUserData()
    }
  },[isAuthenticated])
  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      {/* SEARCH BAR */}
      <Box
        display="flex"
        backgroundColor={colors.primary[400]}
        borderRadius="3px"
      >
        <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton>
      </Box>

      {/* ICONS */}
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        <IconButton>
          <NotificationsOutlinedIcon />
        </IconButton>
        <IconButton>
          <SettingsOutlinedIcon />
        </IconButton>
        <IconButton>

        <>
        <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' , width: '15%'}} >
       
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            {/* <Avatar sx={{ width: 32, height: 32 }}>K</Avatar> */}
            <Avatar sx={{ width: 32, height: 32 }}>{user?.firstName?.charAt(0)?.toUpperCase()}</Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&::before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleProfileRedirect}>
          <Avatar /> Profile
        </MenuItem>
        {/* <MenuItem onClick={handleClose}>
          <Avatar /> My account
        </MenuItem> */}
        <Divider />
      
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small"  />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
       </>
         
        </IconButton>
      </Box>
    </Box>
  );
};

export default Topbar;
