import { Grid, Box, Typography, useTheme } from '@mui/material';

const Services = () => {
  const theme = useTheme();
  return (
    <>
      <Box
        textAlign="center"
        sx={{
          color: theme.palette.secondary.main,
          marginTop: '2rem',
        }}
      >
        <Typography variant="h2">Our services</Typography>
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Box
            textAlign="center"
            sx={{ color: theme.palette.secondary.main, padding: '4rem' }}
          >
            <Typography variant="h4">Fast Shipping</Typography>
            <Typography variant="body1">
              Get your orders delivered quickly with our fast shipping service.
              We prioritize speedy and reliable delivery to ensure you receive
              your purchases in no time.
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Box
            textAlign="center"
            sx={{ color: theme.palette.secondary.main, padding: '4rem' }}
          >
            <Typography variant="h4">Secure Payments</Typography>
            <Typography variant="body1">
              Shop with confidence using our secure payment options. We employ
              the latest encryption technology to safeguard your personal and
              financial information during transactions.
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Box
            textAlign="center"
            sx={{ color: theme.palette.secondary.main, padding: '4rem' }}
          >
            <Typography variant="h4">24/7 Customer Support</Typography>
            <Typography variant="body1">
              Our dedicated customer support team is available round the clock
              to assist you with any queries or concerns. We strive to provide
              excellent support and ensure a seamless shopping experience.
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Services;
