import { Grid } from '@mui/material';
import shopping from '../assets/shopping.jpg';

const SideImage = () => {
  return (
    <Grid
      item
      xs={false}
      sm={4}
      md={7}
      sx={{
        backgroundImage: `url(${shopping})`,
        backgroundRepeat: 'no-repeat',
        backgroundColor: (t) =>
          t.palette.mode === 'light'
            ? t.palette.primary.main
            : t.palette.secondary.main,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    />
  );
};

export default SideImage;
