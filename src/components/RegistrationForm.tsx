import { Box, TextField } from '@mui/material';

const RegistrationForm = () => {
  return (
    <Box component="form">
      <TextField
        label="Email"
        required
        placeholder="Enter your email "
      ></TextField>
    </Box>
  );
};

export default RegistrationForm;
