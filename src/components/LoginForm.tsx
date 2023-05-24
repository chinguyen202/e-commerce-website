import { ChangeEvent, useState } from 'react';
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
import { useForm } from 'react-hook-form';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { FormRow } from '../components';

const initialValues = {
  email: '',
  password: '',
};

const LoginForm = () => {
  const [values, setValues] = useState(initialValues);
  const dispatch = useAppDispatch();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(event.target);
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
