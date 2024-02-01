import React from 'react'
import FirstHomeScreenCard from '../components/FirstHomeScreenCard'
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import SupervisorAccountOutlinedIcon from '@mui/icons-material/SupervisorAccountOutlined';
import { Link } from 'react-router-dom';
const FirstHome = () => {
  const cardsContent = [
    {
      Icon: <AdminPanelSettingsOutlinedIcon style={{ color: 'red', fontSize: 100, height: 100 }} />,
      name: "Admin Portal",
      path:'/login',
      isAdmin:true
    },
    {
      Icon: <SupervisorAccountOutlinedIcon style={{ color: 'red', fontSize: 100, height: 100 }} />,
      name: "Employee Portal",
      path:'/login',
      isAdmin:false

    }
  ]

  return (
    <div className="relative flex flex-col items-center justify-center h-screen">
      {/* Background image with opacity */}
      <div className="absolute inset-0 z-0" style={{ backgroundImage: `url(/firstHPImg.png)`, backgroundSize: 'cover', opacity: '0.7' }}></div>

      {/* Content of the home page */}

      <div className='relative w-full h-20 bg-[#dcdfe0] top-52 opacity-80 backdrop-blur-md'>
        <h6 className="text-red-700 text-xl md:text-3xl text-center pt-4">Welcome to the FYP Prototype</h6>
      </div>
      <div className="relative z-10 flex flex-col items-center justify-center h-full">

        <div className='md:flex gap-4 '>
          {
            cardsContent?.map((data) => {
              return <div className='my-4'>
                <Link to={data?.path} state = {{isAdmin:data?.isAdmin}}>
                <FirstHomeScreenCard Icon={data?.Icon} name={data?.name}  />
                </Link>
              </div>

            })
          }

        </div>
      </div>
    </div>
  )
}

export default FirstHome