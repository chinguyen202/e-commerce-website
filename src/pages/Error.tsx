import { useTheme } from '@mui/material';
import { Box, Container, Typography } from '@mui/material';

const Error = () => {
  const theme = useTheme();
  return (
    <Container maxWidth="xl">
      <Box
        sx={{
          bgcolor: theme.palette.primary.main,
          height: '100vh',
          flexGrow: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          display: { xs: 'contents', md: 'flex' },
        }}
      >
        <Typography
          variant="h3"
          sx={{
            color: theme.palette.secondary.main,
            fontWeight: 600,
            display: { xs: 'inherit', md: 'flex' },
          }}
        >
          404{' '}
        </Typography>
        <Typography variant="h3" sx={{ color: theme.palette.secondary.main }}>
          Sorry, the page you are trying to reach can not be found.
        </Typography>
      </Box>
    </Container>
  );
};

export default Error;
