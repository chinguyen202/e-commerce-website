import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import { SideImage } from '../components';
import LoginForm from '../components/login-register/LoginForm';

const Login = () => {
  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <CssBaseline />
      <SideImage />
      <LoginForm />
    </Grid>
  );
};

export default Login;
