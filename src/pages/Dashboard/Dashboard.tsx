import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import { DashboardSidebar } from '../../components';

const Dashboard = () => {
  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <DashboardSidebar />
      <Box sx={{ flex: '1 1 20%', overflow: 'auto' }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default Dashboard;
