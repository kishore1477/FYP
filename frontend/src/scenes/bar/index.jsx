import { Box } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import BarChart from "../../components/BarChart";
import Header from "../../components/Header";

const Bar = () => {
  const [barChartData, setBarChartData] = useState([]);
  const apiBaseURl = process.env.REACT_APP_backend_url;

  const fetchEmployeeActivityData = async () => {
    try {
      const url = `${apiBaseURl}/getStoreGeneratedQRCodeWithEmployee`;
      const res = await axios.get(url);
      const userData = res?.data;
console.log("res",res)
      if (res.status === 200) {
     

      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    fetchEmployeeActivityData();
  }, []);

  return (
    <Box m="20px">
    {
      barChartData && <>
       <Header title="Bar Chart" subtitle="Bar Chart of Tasks by Employee" />
      <Box height="75vh">
        <BarChart data={barChartData} />
      </Box>
      </>
    }
     
    </Box>
  );
};

export default Bar;
