import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataContacts } from "../../data/mockData";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const  Contacts = () => {
  const theme = useTheme();
 const [rowData, setRowData]= useState([])
  const colors = tokens(theme.palette.mode);
  const apiBaseURl = 'https://8000-patia2-iot-scx2righy6z.ws-us107.gitpod.io/api'
  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "registerationID", headerName: "Registrar ID" },
    {
      field: "firstName",
      headerName: "first Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "lastName",
      headerName: "Last Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "contact",
      headerName: "Phone Number",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "address",
      headerName: "Address",
      flex: 1,
    }
   
  ];
const getUSersData = async(req,res)=>{
  try {
    const url = `${apiBaseURl}/auth/getUsers`
    const res = await  axios.get(url)
    const userData = res?.data
    const formatedRowData = userData?.map((user, i) => {
      const formattedRow = {};
    
      // Iterate over each column definition
      columns.forEach((column) => {
        // Extract the field name from the column definition
        const fieldName = column.field;
    
        // Check if the field exists in the user data
        if (fieldName in user) {
          // If the field exists, add it to the formatted row
          formattedRow[fieldName] = user[fieldName];
        }
      });
    
      // Add the ID field to the formatted row
      formattedRow.id = i + 1;
    
      return formattedRow;
    });
    setRowData(formatedRowData)
   
    console.log("response of getting formatedRowData", formatedRowData)
  } catch (error) {
    toast.error('Error while fetching')
  }
}
useEffect(()=>{
  getUSersData().then((res)=>{
    console.log("res",res)
  })
},[])
  return (
    <Box m="20px">
      <Header
        title="CONTACTS"
        subtitle="List of Contacts for Future Reference"
      />
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
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={rowData}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default Contacts;
