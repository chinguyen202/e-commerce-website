import {
  Box,
  Card,
  CardMedia,
  CardContent,
  useTheme,
  Typography,
  Button,
} from '@mui/material';
import AddToCart from './AddToCart';
import { formatPrice } from '../utils/helpers';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { removeItem } from '../store/reducers/cartSlice';
import { CartItemI } from '../types/Cart';

type CartItemProps = {
  cartItem: CartItemI;
};

const CartItem = ({ cartItem }: CartItemProps) => {
  const theme = useTheme();
  const dispatch = useAppDispatch();

  return (
    <Card
      key={cartItem.id}
      sx={{
        height: '200px',
        display: 'flex',
        justifyContent: 'space-between',
        m: '2rem',
        color: theme.palette.secondary.main,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          width: '80%',
        }}
      >
        <CardMedia
          component="img"
          image={cartItem.images[0]}
          alt={cartItem.title}
          sx={{
            width: '25%',
            objectFit: 'cover',
            marginRight: '2rem',
          }}
        />
        <CardContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            textAlign: 'center',
          }}
        >
          <Typography variant="h5" component="div">
            {cartItem.title}
          </Typography>
          <Typography variant="h6" component="div">
            {formatPrice(cartItem.price)}
          </Typography>
          <Button
            size="medium"
            color="primary"
            sx={{ bgcolor: theme.palette.secondary.main }}
            onClick={() => dispatch(removeItem(cartItem))}
          >
            Remove
          </Button>
        </CardContent>
      </Box>
      <AddToCart item={cartItem} />
    </Card>
  );
};

export default CartItem;
