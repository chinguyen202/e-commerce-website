import { FormEvent, ChangeEvent, useState } from 'react';
import { toast } from 'react-toastify';
import { Button, Box, Grid, Avatar, Typography, useTheme } from '@mui/material';
import useAppSelector from '../../hooks/useAppSelector';
import { FormRow, UploadFileFormRow } from '../../components';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { uploadFile } from '../../utils/helpers';
import { updateAvatar, updateInfo } from '../../store/store';
import { User } from '../../types/User';

const Profile = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const { currentUser, users } = useAppSelector((state) => state.user);
  const initialValues: Partial<User> = {
    name: currentUser?.name ?? '',
    email: currentUser?.email ?? '',
  };
  const [values, setValues] = useState(initialValues);
  const [avatar, setAvatar] = useState<File | null>(null);

  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAvatar(e.target.files[0]);
    }
  };

  const updateAvatarFile = async (event: FormEvent<HTMLInputElement>) => {
    event.preventDefault();
    try {
      if (avatar) {
        const location = await uploadFile(avatar);
        if (location && currentUser) {
          dispatch(updateAvatar({ id: currentUser.id, avatar: location }));
        } else {
          toast.error('Fail to update avatar, please try again');
        }
      }
    } catch (error) {
      console.log(error);
      toast.error('Error when trying to upload avatar');
    }
    setAvatar(null);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      // Check if the new email have been used before
      const emailTemp = users.find((user) => user.email === values.email);
      if (emailTemp) {
        toast.error('Email have been used');
        setValues(initialValues);
        return;
      }
      if (currentUser) {
        console.log('BEFORE DISPATCH', values.name, values.email);
        dispatch(
          updateInfo({
            id: currentUser.id,
            name: !values.name ? currentUser.name : values.name,
            email: !values.email ? currentUser.email : values.email,
          })
        );
        console.log('AFTER DISPATCH', values.name, values.email);
      }
    } catch (error) {
      console.log(error);
      toast.error('Error occured when update info. Please try again later!');
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1rem',
        padding: '1rem',
        borderRadius: '4px',
        bgcolor: 'background.paper',
        color: theme.palette.secondary.main,
      }}
    >
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={8} sm={4} md={4} lg={4}>
          <Box
            component="form"
            onSubmit={updateAvatarFile}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              m: '2rem',
              padding: '2rem',
            }}
          >
            <Avatar
              alt="User Avatar"
              src={currentUser?.avatar}
              sx={{ width: '15rem', height: '15rem', mb: '2rem' }}
            />
            <UploadFileFormRow handleFileChange={handleAvatarChange} />
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              sx={{ mt: '2rem' }}
            >
              Update
            </Button>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          md={6}
          lg={6}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography variant="h4" sx={{ mb: '2rem' }}>
            Update information
          </Typography>
          <Box component="form" onSubmit={handleSubmit}>
            <FormRow
              labelText="Your name"
              name="name"
              type="text"
              value={values.name ?? ''}
              handleChange={handleInputChange}
            />
            <FormRow
              labelText="Email Address"
              name="email"
              type="email"
              value={values.email ?? ''}
              handleChange={handleInputChange}
            />
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              sx={{ mt: '2rem' }}
            >
              Submit
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Profile;
