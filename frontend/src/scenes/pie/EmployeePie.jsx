import { Box } from "@mui/material";
import Header from "../../components/Header";
import PieChart from "../../components/PieChart";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Pie = () => {
  const [data, setData] = useState([]);
  const apiBaseURl = process.env.REACT_APP_backend_url;
  const fetchEmployeeActivityData = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const url = `${apiBaseURl}/getStoreGeneratedQRCodeByEmployeeId/${userId}`;
      const res = await axios.get(url);
      const userData = res?.data;
      console.log("userData", userData);
      if (res.status === 200) {
        const totalPendingTasks = userData?.filter(
          (task) => task.status === 0
        ).length;
        const totalCompletedTasks = userData?.filter(
          (task) => task.status === 1
        ).length;
        setData([
          {
            id: "P",
            label: "Pending Task",
            value: totalPendingTasks,
            color: "hsl(104, 70%, 50%)",
          },
          {
            id: "C",
            label: "Completed Task",
            value: totalCompletedTasks,
            color: "hsl(162, 70%, 50%)",
          },
        ]);
      }
    } catch (error) {
      toast.error("Error while fetching");
    }
  };
  useEffect(() => {
    fetchEmployeeActivityData().then((res) => {
      console.log("res", res);
    });
  }, []);
  return (
    <Box m="20px">
      {data && (
        <>
          <Header
            title="Pie Chart"
            subtitle="Simple Pie Chart of Different Professions"
          />
          <Box height="75vh">
            <PieChart data={data} />
          </Box>
        </>
      )}
    </Box>
  );
};

export default Pie;
