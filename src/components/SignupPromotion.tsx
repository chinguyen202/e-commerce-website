import { Link } from 'react-router-dom';
import { Grid, Box, Typography, Button, useTheme } from '@mui/material';

const SignupPromotion = () => {
  const theme = useTheme();
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <Box
          component="img"
          sx={{
            bgcolor: theme.palette.primary.main,
            width: '100%',
            maxHeight: '30vh',
            objectFit: 'cover',
            padding: '2rem',
          }}
          alt="Promotional Image"
          src={require('../assets/promotion.jpg')}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            height: '100%',
            color: theme.palette.secondary.main,
          }}
        >
          <Typography variant="h3" gutterBottom>
            Sign Up and Get Exclusive Benefits!
          </Typography>
          <Typography variant="body1" gutterBottom>
            Join our community and enjoy exclusive offers, personalized
            recommendations, and faster checkout.
          </Typography>
          <Button
            variant="contained"
            component={Link}
            to="/register"
            color="secondary"
          >
            Sign Up Now
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};

export default SignupPromotion;
