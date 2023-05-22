import { AppBar, Typography } from '@mui/material';

const Footer = () => {
  return (
    <AppBar
      position="static"
      color="secondary"
      sx={{ padding: '1rem', top: 'auto', bottom: 0 }}
    >
      <Typography variant="h6">
        &copy; {new Date().getFullYear()} <span>Platzi</span>. All rights
        reserved.
      </Typography>
    </AppBar>
  );
};

export default Footer;
