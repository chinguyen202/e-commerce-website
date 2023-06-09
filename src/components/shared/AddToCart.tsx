import { useState } from 'react';
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
import { CartItemI } from '../../types/Cart';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import {
  decreaseAmount,
  increaseAmount,
  removeItem,
  addItem,
} from '../../store/reducers/cartSlice';
import useAppSelector from '../../hooks/useAppSelector';
import { Product } from '../../types/Product';

type Props = {
  item: CartItemI | Product;
  isProductPage: boolean;
};

const AddToCart = ({ item, isProductPage }: Props) => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const [number, setNumber] = useState(0);
  const cartItem = useAppSelector((state) =>
    state.cart.cartItems.find((temp) => temp.id === item.id)
  );
  const amount = useAppSelector((state) => {
    if (cartItem) {
      const cartItemTemp = state.cart.cartItems.find(
        (item) => item.id === cartItem.id
      ) as CartItemI;
      return cartItemTemp ? cartItemTemp.amount : 0;
    }
  });

  const increase = () => {
    setNumber(number + 1);
    if (cartItem) dispatch(increaseAmount(cartItem));
  };

  const decrease = () => {
    if (number === 0) {
      return;
    }
    setNumber(number - 1);
    if (amount === 1 && cartItem) {
      dispatch(removeItem(cartItem));
      return;
    }
    if (cartItem) dispatch(decreaseAmount(cartItem));
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
        <IconButton
          onClick={decrease}
          size="medium"
          sx={{ color: theme.palette.secondary.main }}
        >
          <RemoveIcon />
        </IconButton>
        <Typography variant="h4" style={{ margin: '0 1rem' }}>
          {cartItem ? amount : number}
        </Typography>
        <IconButton
          onClick={increase}
          size="medium"
          sx={{ color: theme.palette.secondary.main }}
        >
          <AddIcon />
        </IconButton>
      </Box>
      {isProductPage ? (
        <Button
          variant="contained"
          color="secondary"
          onClick={() => {
            dispatch(addItem({ product: item, amount: number }));
          }}
          sx={{ fontSize: '1.2rem' }}
        >
          Add to Cart
        </Button>
      ) : (
        <></>
      )}
    </Box>
  );
};

export default AddToCart;
