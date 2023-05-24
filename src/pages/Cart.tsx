import { useTheme } from '@mui/material';
import { Box, Button, Container, Divider, Typography } from '@mui/material';
import { CartItem, CurrentLocation } from '../components';
import useAppSelector from '../hooks/useAppSelector';
import { formatPrice } from '../utils/helpers';
import { clearCart } from '../store/reducers/cartSlice';
import { useAppDispatch } from '../hooks/useAppDispatch';

const Cart = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const { cartItems, total, totalAmount, isLoading } = useAppSelector(
    (state) => state.cart
  );
  const handleClearCart = () => {
    dispatch(clearCart());
    console.log(cartItems);
  };

  if (totalAmount < 1) {
    return (
      <>
        <CurrentLocation name="Cart" singleProduct={false} />
        <Container sx={{ height: '100vh', mt: '5rem' }}>
          <Typography variant="h3" sx={{ textAlign: 'center' }}>
            Your cart is empty
          </Typography>
        </Container>
      </>
    );
  }

  return (
    <Container maxWidth={false} sx={{ color: theme.palette.secondary.main }}>
      <CurrentLocation name="Cart" singleProduct={false} />
      {/* if the amount of cart item is less than 1, display empty cart */}

      {/* cart header */}
      <Container sx={{ height: '100vh', mt: '2rem' }}>
        <Typography variant="h3" sx={{ textAlign: 'center' }}>
          YOUR BAG
        </Typography>
        {/* cart item display */}
        {cartItems.map((cartItem) => (
          <CartItem key={cartItem.id} cartItem={cartItem} />
        ))}
        {/* cart footer */}
        <Divider sx={{ mt: '2rem', color: 'red' }} />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            margin: '2rem',
          }}
        >
          <Typography variant="h5">Total price</Typography>
          <Typography variant="h5">{formatPrice(total)}</Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <Button
            size="medium"
            color="primary"
            sx={{ bgcolor: theme.palette.secondary.main }}
            onClick={handleClearCart}
          >
            Clear cart
          </Button>
        </Box>
      </Container>
    </Container>
  );
};

export default Cart;
