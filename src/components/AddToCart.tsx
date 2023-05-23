import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  Divider,
  Typography,
  useTheme,
  IconButton,
  Button,
  Box,
} from '@mui/material';
import { Product } from '../types/Product';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

type Props = {
  product: Product;
};

const AddToCart = ({ product }: Props) => {
  const theme = useTheme();
  const [amount, setAmount] = useState(1);

  const increase = () => {
    setAmount(amount + 1);
  };

  const decrease = () => {
    if (amount > 1) {
      setAmount(amount - 1);
    }
  };

  return (
    <Container
      sx={{
        padding: '2rem',
        color: theme.palette.secondary.main,
        bgcolor: theme.palette.primary.main,
      }}
    >
      <Divider />
      <Typography variant="h6" sx={{ marginTop: '2rem' }}>
        Add To Cart
      </Typography>
      <Box
        style={{
          display: 'flex',
          marginTop: '2rem',
          marginBottom: '2rem',
        }}
      >
        <IconButton onClick={decrease} size="medium">
          <RemoveIcon />
        </IconButton>
        <Typography variant="h4" style={{ margin: '0 1rem' }}>
          {amount}
        </Typography>
        <IconButton onClick={increase} size="medium">
          <AddIcon />
        </IconButton>
      </Box>
      <Link to="/cart">
        <Button variant="contained" color="secondary" onClick={() => {}}>
          Go to Cart
        </Button>
      </Link>
    </Container>
  );
};

export default AddToCart;
