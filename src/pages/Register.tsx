import { Grid } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { SideImage } from '../components';
import RegisterForm from '../components/RegisterForm';

const Register = () => {
  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <CssBaseline />
      <SideImage />
      <RegisterForm />
    </Grid>
  );
};

export default Register;
