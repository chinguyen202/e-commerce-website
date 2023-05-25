import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Avatar,
  Typography,
  Grid,
  Button,
  Link,
  Paper,
} from '@mui/material';
import { toast } from 'react-toastify';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { FormRow, UploadFileFormRow } from '../components';
import { registerUser } from '../store/thunks/userThunks';
import { uploadFile } from '../utils/helpers';
import useAppSelector from '../hooks/useAppSelector';
import { fetchAllUsers } from '../store/store';

const initialValues = {
  name: '',
  email: '',
  password: '',
  avatar: '',
};

const RegisterForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { users, currentUser, isLoading } = useAppSelector(
    (state) => state.user
  );
  const [values, setValues] = useState(initialValues);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  useEffect(() => {
    dispatch(fetchAllUsers());
    if (currentUser) {
      setTimeout(() => {
        if (currentUser.role === 'customer') {
          navigate('/');
        } else {
          navigate('/dashboard');
        }
      }, 3000);
    }
  }, [dispatch, currentUser, navigate]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAvatarFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      // Check if all form fields have been filled
      if (!values.email || !values.password || !values.name || !avatarFile) {
        console.log(values, avatarFile);
        toast.error('Please fill in all the file');
        return; // Exit the function
      }
      // Check if the email have been used before
      const emailTemp = users.find((user) => user.email === values.email);
      if (emailTemp) {
        toast.error('Email have been used');
        setValues(initialValues);
        setAvatarFile(null);
        return;
      }
      if (avatarFile) {
        const location = await uploadFile(avatarFile);
        if (location) {
          dispatch(registerUser({ ...values, avatar: location }));
        } else {
          toast.error('Error in upload avatar');
        }
      }
      setValues(initialValues);
      setAvatarFile(null);
    } catch (error) {
      toast.error('Registration failed with error ');
      console.error('Registration error:', error);
    }
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
          Sign Up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
          {/* Name field */}
          <FormRow
            labelText="Name"
            name="name"
            type="text"
            value={values.name}
            handleChange={handleChange}
          />
          {/* email field */}
          <FormRow
            labelText="Email Address"
            name="email"
            type="email"
            value={values.email}
            handleChange={handleChange}
          />
          {/* password field */}
          <FormRow
            labelText="Password"
            name="password"
            type="password"
            value={values.password}
            handleChange={handleChange}
          />
          {/* upload avatar form */}
          <UploadFileFormRow handleFileChange={handleAvatarChange} />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={isLoading}
          >
            Sign Up
          </Button>
          <Grid container>
            <Grid item>
              <Link
                href="login"
                variant="body1"
                sx={{
                  color: (t) =>
                    t.palette.mode === 'light'
                      ? t.palette.secondary.main
                      : t.palette.primary.main,
                }}
              >
                {'Already have an account? Sign In'}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Grid>
  );
};

export default RegisterForm;
