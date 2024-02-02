import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";
import Invoices from "./scenes/invoices";
import Contacts from "./scenes/contacts";
import Bar from "./scenes/bar";
import Form from "./scenes/form";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import FAQ from "./scenes/faq";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Calendar from "./scenes/calendar/calendar";
import FirstHome from "./pages/FirstHome";
import Login from "./pages/Login";
import RenderSideBar from "./components/RenderSideBar";
import RenderToolbar from "./components/RenderToolbar";
import RenderThemeProvider from "./components/RenderThemeProvider";
import { ToastContainer, toast } from 'react-toastify';
import GenerateQrCode from "./scenes/QrCode";
import { useDispatch } from "react-redux";
import { setToken } from "./redux/slice/authenticationSlice";
import Profile from "./pages/Profile";
function App() {
  const dispatch = useDispatch()
  const [theme, colorMode] = useMode();

  useEffect(() => {
    // Check if there's a token in browser storage
    const storedToken = localStorage.getItem('jwtToken');
    // If there is a stored token, dispatch the setToken action
    if (storedToken) {
      dispatch(setToken(storedToken));
    }
  }, [dispatch]);
  return (
    <ColorModeContext.Provider value={colorMode}>
      {/* <RenderThemeProvider> */}
<ToastContainer/>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {/* <Sidebar  /> */}
          <RenderSideBar/>
          <main className="content">
         <RenderToolbar/>
            <Routes>
              <Route path="/" element={<FirstHome />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/team" element={<Team />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/invoices" element={<Invoices />} />
              <Route path="/form" element={<Form />} />
              <Route path="/bar" element={<Bar />} />
              <Route path="/pie" element={<Pie />} />
              <Route path="/line" element={<Line />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/generateQrCode" element={<GenerateQrCode />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
      {/* </RenderThemeProvider> */}

    </ColorModeContext.Provider>
  );
}

export default App;
