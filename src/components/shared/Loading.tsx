import { Box, Container, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

const Loading = () => {
  return (
    <Container
      maxWidth={false}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="h3">Loading...</Typography>
      </Box>
    </Container>
  );
};

export default Loading;
