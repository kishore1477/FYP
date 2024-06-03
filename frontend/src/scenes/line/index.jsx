import { Box } from "@mui/material";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Line = () => {
  const [lineChartData, setLineChartData] = useState([]);
  const fetchEmployeeActivityData = async () => {
    try {
      const apiBaseURl =process.env.REACT_APP_backend_url
      const url = `${apiBaseURl}/getStoreGeneratedQRCodeWithEmployee`;
      const res = await axios.get(url);
      const userData = res?.data;
  
      if (res.status === 200) {
  
        // Aggregate data for the line chart
        const aggregateTasks = (status) => {
          const taskCounts = {};
  
          userData.forEach(task => {
            if (task.status === status) {
              const initial = task?.employee?.firstName
              taskCounts[initial] = (taskCounts[initial] || 0) + 1;
            }
          });
  
          return Object.keys(taskCounts).map(initial => ({
            x: initial,
            y: taskCounts[initial],
          }));
        };
  
        const lineChartData = [
          {
            id: "Pending Task",
            color: "hsl(104, 70%, 50%)",
            data: aggregateTasks(0),
          },
          {
            id: "Completed Task",
            color: "hsl(162, 70%, 50%)",
            data: aggregateTasks(1),
          },
        ];
  
        setLineChartData(lineChartData);
      }
    } catch (error) {
      toast.error('Error while fetching');
    }
  };
  
  // Inside your component
 
  
  useEffect(() => {
    fetchEmployeeActivityData();
  }, []);
  console.log("lineChartData",lineChartData)
  return (
    <Box m="20px">
      {
        lineChartData && <>
        <Header title="Line Chart" subtitle="Simple Line Chart" />
      <Box height="75vh">
        <LineChart  data={lineChartData}/>
      </Box>
        </>
      }
      
    </Box>
  );
};

export default Line;
