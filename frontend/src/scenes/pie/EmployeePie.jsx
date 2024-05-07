

import { Box } from "@mui/material";
import Header from "../../components/Header";
import PieChart from "../../components/PieChart";

const EmployeePie = () => {
  return (
    <Box m="20px">
      <Header title="Pie Chart" subtitle="Simple Pie Chart of Different Professions" />
      <Box height="75vh">
        <PieChart />
      </Box>
    </Box>
  );
};

export default EmployeePie;