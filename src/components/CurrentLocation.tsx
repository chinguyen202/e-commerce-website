import { Link } from 'react-router-dom';
import { Container, Box, Typography, useTheme } from '@mui/material';

type CurrentLocationProps = {
  name: string;
};

const CurrentLocation = ({ name }: CurrentLocationProps) => {
  const theme = useTheme();
  return (
    <Container
      maxWidth={false}
      sx={{ bgcolor: theme.palette.background.default }}
    >
      <Typography
        variant="h5"
        sx={{ color: theme.palette.primary.main, padding: '2rem' }}
      >
        <Link
          to="/"
          style={{
            textDecoration: 'none',
            color: 'inherit',
          }}
        >
          Home
        </Link>
        /{name}
      </Typography>
    </Container>
  );
};
export default CurrentLocation;
