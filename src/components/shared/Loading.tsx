import { Box, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

const Loading = () => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', height: '100vh' }}>
      <CircularProgress />
      <Typography variant="h3">Loading ...</Typography>
    </Box>
  );
};

export default Loading;
