import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { mockTransactions } from "../../data/mockData";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import Header from "../../components/Header";
import dayjs from 'dayjs'
import LineChart from "../../components/LineChart";
import BarChart from "../../components/BarChart";
import StatBox from "../../components/StatBox";
import ProgressCircle from "../../components/ProgressCircle";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import axios from "axios";
import PieChart from "../../components/PieChart";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [lineChartData, setLineChartData] = useState([]);
  const [data, setData] = useState([]);
  const [pieChartData, setPieChartData] = useState([]);
  const [numberOfChartData, setNumberOfChartData] = useState({
    completed: 0,
    pending: 0,
  });
  const apiBaseURl = process.env.REACT_APP_backend_url;
  const fetchEmployeeActivityData = async () => {
    try {
      const url = `${apiBaseURl}/getStoreGeneratedQRCodeWithEmployee`;
      const res = await axios.get(url);
      const userData = res?.data;
      console.log("userData", userData);
      if (res.status === 200) {
        setData(userData);
        const totalPendingTasks = userData?.filter(
          (task) => task.status === 0
        ).length;
        const totalCompletedTasks = userData?.filter(
          (task) => task.status === 1
        ).length;
        setNumberOfChartData({
          completed: totalCompletedTasks,
          pending: totalPendingTasks,
        });
        setPieChartData([
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
        const aggregateTasks = (status) => {
          const taskCounts = {};

          userData.forEach((task) => {
            if (task.status === status) {
              const initial = task?.employee?.firstName;
              taskCounts[initial] = (taskCounts[initial] || 0) + 1;
            }
          });

          return Object.keys(taskCounts).map((initial) => ({
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
      toast.error("Error while fetching");
    }
  };
  useEffect(() => {
    fetchEmployeeActivityData().then((res) => {
      console.log("res", res);
    });
  }, []);
  const completedTask = numberOfChartData?.completed;
  const pendingTask = numberOfChartData?.pending;
  const TotalTask = completedTask + pendingTask;
  const completedTaskPercentage = (completedTask / TotalTask) * 100;
  const pendingTaskPercentage = (pendingTask / TotalTask) * 100;

  const mostRecentData = data?.map((user) => {
    return {
      txId: user?._id?.slice(0, 5),
      user: user?.employee?.firstName,
      date:dayjs(user?.createdAt)?.format('DD-MM-YYYY hh:mm A'),
      cost: user?.status === 0 ? "Pending" : "Completed",
    };
  });
  console.log("mostRecentData", mostRecentData, data);
  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />

        {/* <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box> */}
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 4"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={completedTask}
            subtitle="Completed Task"
            progress={completedTask / 100}
            increase={`${completedTaskPercentage?.toFixed(0)} %`}
            icon={
              <EmailIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        {/* <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="431,225"
            subtitle="Sales Obtained"
            progress="0.50"
            increase="+21%"
            icon={
              <PointOfSaleIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box> */}
        <Box
          gridColumn="span 4"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={pendingTask}
            subtitle="Pending Task"
            progress={pendingTaskPercentage / 100}
            increase={`${pendingTaskPercentage.toFixed(0)} %`}
            icon={
              <PersonAddIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 4"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={TotalTask}
            subtitle="Total Task"
            progress="0.80"
            // increase="+43%"
            icon={
              <TrafficIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        {/* Line chart */}
        <Box
          backgroundColor={colors.primary[400]}
          gridColumn="span 8"
          gridRow="span 3"
        >
          {lineChartData && (
            <>
              <Header
                title="Line Chart"
                subtitle="Simple Line Chart of Employee"
              />
              <Box height={"50vh"} width={"50vw"}>
                <LineChart data={lineChartData} />
              </Box>
            </>
          )}
        </Box>
        {/* ROW 2 */}
        {/* <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Revenue Generated
              </Typography>
              <Typography
                variant="h3"
                fontWeight="bold"
                color={colors.greenAccent[500]}
              >
                $59,342.32
              </Typography>
            </Box>
            <Box>
              <IconButton>
                <DownloadOutlinedIcon
                  sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                />
              </IconButton>
            </Box>
          </Box>
          <Box height="250px" m="-20px 0 0 0">
         
          </Box>
        </Box> */}
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          overflow="auto"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Recent Status
            </Typography>
          </Box>
          {mostRecentData.map((transaction, i) => (
            <Box
              key={`${transaction.txId}-${i}`}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              p="15px"
            >
              <Box>
                <Typography
                  color={colors.greenAccent[500]}
                  variant="h5"
                  fontWeight="600"
                >
                  {transaction.txId}
                </Typography>
                <Typography color={colors.grey[100]}>
                  {transaction.user}
                </Typography>
              </Box>
              <Box color={colors.grey[100]}>{transaction.date}</Box>
              <Box
                backgroundColor={colors.greenAccent[500]}
                p="5px 10px"
                borderRadius="4px"
              >
                {transaction.cost}
              </Box>
            </Box>
          ))}
        </Box>

        {/* ROW 3 */}

        {/* <Box
          gridColumn="span 6"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "30px 30px 0 30px" }}
          >
            Sales Quantity
          </Typography>
          <Box height="250px" mt="-20px">
  
          </Box>
        </Box>
      */}
      </Box>
      {/* Pie chart */}
      <Box
        m="20px"
        backgroundColor={colors.primary[400]}
        gridRow="row 2"
        gridColumn="span 6 "
      >
        {pieChartData && (
          <>
            <Header
              title="Pie Chart"
              subtitle="Simple Pie Chart of completed and pending Tasks"
            />
            <Box height="75vh">
              <PieChart data={pieChartData} />
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
};

export default Dashboard;
