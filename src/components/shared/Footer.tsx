import { AppBar, Typography } from '@mui/material';

const Footer = () => {
  return (
    <AppBar position="fixed" sx={{ top: 'auto', padding: '1rem', bottom: 0 }}>
      <Typography variant="h6">
        &copy; {new Date().getFullYear()} <span>Platzi</span>. All rights
        reserved.
      </Typography>
    </AppBar>
  );
};

export default Footer;
