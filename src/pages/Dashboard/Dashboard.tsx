import { Outlet } from 'react-router-dom';
import { DashboardSidebar } from '../../components';

const Dashboard = () => {
  return (
    <>
      <DashboardSidebar />
      <Outlet />
    </>
  );
};

export default Dashboard;
