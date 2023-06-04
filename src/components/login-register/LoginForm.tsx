import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Grid,
  Link,
  Paper,
  Box,
  Avatar,
  Typography,
  Button,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { toast } from 'react-toastify';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { FormRow } from '..';
import { loginUser } from '../../store/store';
import useAppSelector from '../../hooks/useAppSelector';
import { LoginData } from '../../types/User';

const initialValues: LoginData = {
  email: '',
  password: '',
};

const LoginForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [values, setValues] = useState(initialValues);
  const { currentUser, isLoading } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (currentUser) {
      setTimeout(() => {
        if (currentUser?.role === 'admin') {
          navigate('/user');
        } else {
          navigate('/');
        }
      }, 3000);
    }
  }, [currentUser, dispatch, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { email, password } = values;
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }
    dispatch(loginUser({ email, password }));
  };

  return (
    <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
      <Box
        sx={{
          my: 8,
          mx: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h4">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <FormRow
            labelText="Email Address"
            name="email"
            type="email"
            value={values.email}
            handleChange={handleChange}
          />
          <FormRow
            labelText="Password"
            name="password"
            type="password"
            value={values.password}
            handleChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: '2rem', mb: '2rem', fontSize: '1.2rem' }}
            disabled={isLoading}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link
                href="register"
                variant="subtitle1"
                sx={{ color: 'inherit' }}
              >
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Grid>
  );
};

export default LoginForm;
