 

 import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataTeam } from "../../data/mockData";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const EmployeeActivity = () => {
  const theme = useTheme();
  const [employeeActivityData, setEmployeeActivityData] = useState([]);
  const colors = tokens(theme.palette.mode);
  const columns = [
    { field: 'product_name', headerName: 'Product Name', flex: 1 },
    { field: 'color', headerName: 'Color', flex: 1 },
    { field: 'size', headerName: 'Size', flex: 1 },
    { field: 'brand', headerName: 'Brand', flex: 1 },
    { field: 'otherDetails', headerName: 'Other Details', flex: 1 },
    { field: 'stitching_type', headerName: 'Stitching Type', flex: 1 },
    { field: 'line', headerName: 'Line', type: 'number', flex: 1 },
    { field: 'pocket_type', headerName: 'Pocket Type', flex: 1 },
    { field: 'status', headerName: 'Status', flex: 1, render: (params) => {
        return (
          <Box
            sx={{
              color:
                params.row.status ===0
                  ? colors.red[500]
                  : colors.greenAccent[200],
            }}
          >
            {params.row.status===0 ? "Pending" : "Completed"}
          </Box>
        );
      }
    },
  ];
  const apiBaseURl =process.env.REACT_APP_backend_url
const fetchEmployeeActivityData = async () => {

    try {
        const userId = localStorage.getItem('userId')
        const url = `${apiBaseURl}/getStoreGeneratedQRCodeByEmployeeId/${userId}`
        const res = await axios.get(url)
        const userData = res?.data
        if(res.status === 200){
            const fromatedData = userData.map((data,index)=>{
                return {
                    ...data,
                    id:index+1,                   
                }
            })
            setEmployeeActivityData(fromatedData)

        }
        } catch (error) {
        toast.error('Error while fetching')
    }
}
useEffect(() => {
    fetchEmployeeActivityData().then((res) => {
        console.log("res", res)
    })
}
, [])
console.log("employeeActivityData",employeeActivityData)
  return (
    <Box m="20px">
      <Header title="Activity" subtitle="Pending and Completed task" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid  rows={employeeActivityData} columns={columns} />
      </Box>
    </Box>
  );
};

export default EmployeeActivity;

