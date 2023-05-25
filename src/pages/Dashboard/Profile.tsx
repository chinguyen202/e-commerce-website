import React from 'react';
import {
  Grid,
  Box,
  Typography,
  TextField,
  Button,
  Avatar,
  FormControl,
  FormHelperText,
} from '@mui/material';
import useAppSelector from '../../hooks/useAppSelector';

const Profile = () => {
  const { currentUser } = useAppSelector((state) => state.user);
  const [values, setValues] = React.useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    avatar: null as File | null,
  });
  const [errors, setErrors] = React.useState({
    name: '',
    email: '',
    avatar: '',
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setValues((prevValues) => ({ ...prevValues, avatar: file }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Form validation
    let formIsValid = true;
    const newErrors = {
      name: '',
      email: '',
      avatar: '',
    };

    if (!values.name.trim()) {
      newErrors.name = 'Name is required';
      formIsValid = false;
    }

    if (!values.email.trim()) {
      newErrors.email = 'Email is required';
      formIsValid = false;
    } else if (
      !/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(values.email)
    ) {
      newErrors.email = 'Invalid email format';
      formIsValid = false;
    }

    if (!formIsValid) {
      setErrors(newErrors);
      return;
    }

    // Dispatch updateProfile action
    // Assuming you have the "updateProfile" action defined in your Redux store
    const { name, email, avatar } = values;
    // dispatch(updateProfile({ name, email, avatar }));
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1rem',
        padding: '1rem',
        boxShadow: 1,
        borderRadius: '4px',
        bgcolor: 'background.paper',
      }}
    >
      <Avatar
        alt="User Avatar"
        src={currentUser?.avatar}
        sx={{ width: '8rem', height: '8rem' }}
      />
      <Typography variant="h6" align="center">
        Edit Profile
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          name="name"
          label="Name"
          variant="outlined"
          value={values.name}
          onChange={handleInputChange}
          error={!!errors.name}
          helperText={errors.name}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          name="email"
          label="Email"
          variant="outlined"
          value={values.email}
          onChange={handleInputChange}
          error={!!errors.email}
          helperText={errors.email}
          fullWidth
          margin="normal"
          required
        />
        <FormControl error={!!errors.avatar} fullWidth>
          <input
            accept="image/*"
            type="file"
            id="avatar-input"
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
          <label htmlFor="avatar-input">
            <Button variant="outlined" component="span">
              Upload Avatar
            </Button>
          </label>
          {errors.avatar && <FormHelperText>{errors.avatar}</FormHelperText>}
        </FormControl>
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Save Changes
        </Button>
      </form>
    </Box>
  );
};

export default Profile;
