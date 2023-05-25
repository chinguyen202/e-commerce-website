import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { SideImage } from '../components';
import RegisterForm from '../components/RegisterForm';
import useAppSelector from '../hooks/useAppSelector';

const Register = () => {
  const navigate = useNavigate();
  const { currentUser } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (currentUser) {
      setTimeout(() => {
        navigate('/dashboard');
      }, 3000);
    }
  }, [currentUser, navigate]);
  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <CssBaseline />
      <SideImage />
      <RegisterForm />
    </Grid>
  );
};

export default Register;
