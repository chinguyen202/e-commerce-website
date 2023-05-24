import { Link } from 'react-router-dom';
import {
  Divider,
  Typography,
  useTheme,
  IconButton,
  Button,
  Box,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { CartItemI } from '../types/Cart';
import { useAppDispatch } from '../hooks/useAppDispatch';
import {
  decreaseAmount,
  increaseAmount,
  removeItem,
} from '../store/reducers/cartSlice';
import useAppSelector from '../hooks/useAppSelector';

type Props = {
  cartItem: CartItemI;
};

const AddToCart = ({ cartItem }: Props) => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const amount = useAppSelector((state) => {
    const cartItemTemp = state.cart.cartItems.find(
      (item) => item.id === cartItem.id
    ) as CartItemI;
    return cartItemTemp ? cartItemTemp.amount : 0;
  });

  const increase = () => {
    dispatch(increaseAmount(cartItem));
  };

  const decrease = () => {
    if (amount === 1) {
      dispatch(removeItem(cartItem));
      return;
    }
    dispatch(decreaseAmount(cartItem));
  };

  return (
    <Box
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
          Add to Cart
        </Button>
      </Link>
    </Box>
  );
};

export default AddToCart;
