import { Box, TextField, Button } from '@mui/material';

const UserForm = () => {
  return (
    <Box
      component="form"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        border: '1px solid #ccc',
        width: '50%',
        maxHeight: '60vh',
        padding: '2rem',
        margin: '2rem',
        overflowY: 'auto',
      }}
    >
      <TextField label="Email" type="email" required />
      <TextField label="Password" type="password" required />
      <Button variant="contained" type="submit">
        Log In
      </Button>
    </Box>
  );
};

export default UserForm;
