import { Link } from 'react-router-dom';
import { Grid, Box, Typography, Button, useTheme } from '@mui/material';

const Hero = () => {
  const theme = useTheme();
  return (
    <Grid container>
      {/* Grid container with 40% width */}
      <Grid item xs={12} md={4}>
        <Box
          sx={{
            bgcolor: theme.palette.primary.main,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            height: '100%',
            padding: '2rem',
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontSize: '4rem',
              fontWeight: 500,
              color: theme.palette.secondary.main,
            }}
          >
            Where Shopping Dreams Come True
          </Typography>
          <Typography
            variant="body1"
            sx={{
              mt: '2rem',
              fontSize: '1.2rem',
              color: theme.palette.secondary.main,
            }}
          >
            Discover endless possibilities with our wide range of products,
            unbeatable deals, and seamless shopping experience. Embrace
            convenience, quality, and satisfaction as you indulge in a world of
            shopping delights.
          </Typography>
          <Button
            variant="contained"
            component={Link}
            to="/products"
            color="secondary"
            sx={{ mt: '2rem' }}
          >
            Shop Now
          </Button>
        </Box>
      </Grid>

      {/* Image container with 60% width */}
      <Grid item xs={12} md={8}>
        <Box
          component="img"
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            padding: '2rem',
          }}
          alt="hero image"
          src={require('../assets/hero.jpg')}
        />
      </Grid>
    </Grid>
  );
};

export default Hero;
