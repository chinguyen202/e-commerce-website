import { FormEvent, ChangeEvent, useState } from 'react';
import { toast } from 'react-toastify';
import { Button, Box, Grid, Avatar, Typography } from '@mui/material';
import useAppSelector from '../../hooks/useAppSelector';
import { FormRow, UploadFileFormRow } from '../../components';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { uploadFile } from '../../utils/helpers';
import { updateAvatar } from '../../store/store';

const Profile = () => {
  const dispatch = useAppDispatch();
  const { currentUser } = useAppSelector((state) => state.user);
  const [values, setValues] = useState({
    id: currentUser ? currentUser.id : '',
    name: currentUser ? currentUser.name : '',
    email: currentUser ? currentUser.email : '',
    // password: currentUser ? currentUser.password : '',
  });
  const [avatar, setAvatar] = useState<File | null>(null);
  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAvatar(e.target.files[0]);
    }
  };
  const updateAvatarFile = async (event: ChangeEvent<HTMLInputElement>) => {
    try {
      if (avatar) {
        const location = await uploadFile(avatar);
        if (location) {
          dispatch(updateAvatar({ ...values, avatar: location }));
          console.log(location);
        } else {
          toast.error('Fail to update avatar, please try again');
        }
      }
    } catch (error) {
      toast.error('Error when trying to upload avatar');
    }
    setAvatar(null);
  };

  const handleInputChange = () => {};
  const handleSubmit = () => {};

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1rem',
        padding: '1rem',
        // boxShadow: 1,
        borderRadius: '4px',
        bgcolor: 'background.paper',
      }}
    >
      <Grid container spacing={2} alignItems="center">
        <Grid
          item
          xs={8}
          sm={4}
          md={4}
          lg={4}
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
            variant="contained"
            color="secondary"
            onClick={() => updateAvatarFile}
            sx={{ mt: '2rem' }}
          >
            Submit
          </Button>
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
            Your information
          </Typography>
          <FormRow
            labelText="Your name"
            name="name"
            type="text"
            value={values.name}
            handleChange={handleInputChange}
          />
          <FormRow
            labelText="Email Address"
            name="email"
            type="email"
            value={values.email}
            handleChange={handleInputChange}
          />
          {/* <FormRow
            labelText="Password"
            name="password"
            type="password"
            value={values.password}
            handleChange={handleInputChange}
          /> */}
          <Button
            variant="contained"
            color="secondary"
            onClick={handleSubmit}
            sx={{ mt: '2rem' }}
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Profile;
