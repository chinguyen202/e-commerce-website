import CssBaseline from '@mui/material/CssBaseline';
import { Grid } from '@mui/material';
import { DashboardSidebar } from '../../components';

const Dashboard = () => {
  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <CssBaseline />

      <DashboardSidebar />

      {/* <Grid
        item
        xs={12}
        sm={8}
        md={5}
        component={Paper}
        elevation={6}
        square
      ></Grid> */}
    </Grid>
  );
};

export default Dashboard;
