import { useState, ChangeEvent, FormEvent } from 'react';
import {
  Box,
  Avatar,
  Typography,
  Grid,
  TextField,
  Button,
  Link,
  Paper,
} from '@mui/material';
import { toast } from 'react-toastify';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { FormRow, UploadFileForm } from '../components';
import { registerUser } from '../store/thunks/loginUser';

const initialValues = {
  name: '',
  email: '',
  password: '',
  avatar: '',
};

const RegisterForm = () => {
  const dispatch = useAppDispatch();
  const [values, setValues] = useState(initialValues);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

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

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (avatarFile) {
        const formData = new FormData();
        formData.append('file', avatarFile);
        // const response = await fetch(
        //   'https://api.escuelajs.co/api/v1/files/upload',
        //   {
        //     method: 'POST',
        //     body: formData,
        //   }
        // );
        // const data = await response.json();
        // const { location } = data;
        // setValues((prevValues) => ({
        //   ...prevValues,
        //   avatar: location,
        // }));
      }

      // dispatch(registerUser(values))
      //   .then(() => {
      //     toast.success('Registration successful!');
      //   })
      //   .catch((error) => {
      //     toast.error('Registration failed.');
      //     console.error('Registration error:', error);
      //   });
    } catch (error) {
      toast.error('Avatar upload failed.');
      console.error('Avatar upload error:', error);
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
          <TextField
            type="file"
            fullWidth
            onChange={handleAvatarChange}
            inputProps={{ accept: 'image/*' }} // specify accepted file types, e.g., images
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
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
