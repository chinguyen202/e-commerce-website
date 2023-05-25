import { useEffect, useState } from 'react';
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
import { useAppDispatch } from '../hooks/useAppDispatch';
import { FormRow } from '../components';
import { getUserProfile, loginUser } from '../store/store';
import useAppSelector from '../hooks/useAppSelector';
import { LoginData } from '../types/User';
import { useNavigate } from 'react-router-dom';

const initialValues: LoginData = {
  email: '',
  password: '',
};

const LoginForm = () => {
  const [values, setValues] = useState(initialValues);
  const { token, currentUser, isLoading } = useAppSelector(
    (state) => state.user
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      dispatch(getUserProfile(token));
      setTimeout(() => {
        if (currentUser?.role === 'admin') {
          navigate('/dashboard');
        } else {
          navigate('/');
        }
      }, 3000);
    }
  }, [token, currentUser, dispatch, navigate]);

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
        <Typography component="h1" variant="h5">
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
            sx={{ mt: 3, mb: 2 }}
            disabled={isLoading}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link
                href="register"
                variant="body1"
                sx={{
                  color: (t) =>
                    t.palette.mode === 'light'
                      ? t.palette.secondary.main
                      : t.palette.primary.main,
                }}
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
