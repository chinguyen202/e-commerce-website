import { Link } from 'react-router-dom';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Button,
  useTheme,
} from '@mui/material';
import { ProductsProps } from '../types/Product';

const ProductsListView = ({ products }: ProductsProps) => {
  const theme = useTheme();
  return (
    <>
      {products.map((product) => (
        <Card
          key={product.id}
          sx={{
            display: 'flex',
            m: '2rem',
            color: theme.palette.secondary.main,
          }}
        >
          <CardMedia
            component="img"
            height="250"
            width="150"
            image={product.images[0]}
            alt={product.title}
            sx={{
              width: '30%',
              objectFit: 'cover',
              marginRight: '2rem',
              borderRadius: '2rem',
            }}
          />
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <CardContent>
              <Box>
                <Typography variant="h6" component="div">
                  {product.title}
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  Category: {product.category.name}
                </Typography>
              </Box>
              <Button
                component={Link}
                to={`/products/${product.id}`}
                variant="contained"
                sx={{
                  mt: '5rem',
                  bgcolor: theme.palette.secondary.main,
                  color: theme.palette.primary.main,
                }}
              >
                View Details
              </Button>
            </CardContent>
          </Box>
        </Card>
      ))}
    </>
  );
};

export default ProductsListView;
