import { Card, CardMedia, CardContent, Typography } from '@mui/material';
import { Product } from '../types/Product';
import { formatPrice } from '../utils/helpers';

type ProductItemProps = {
  product: Product;
};

const ProductGridItem = ({ product }: ProductItemProps) => {
  return (
    <Card
      key={product.id}
      sx={{
        height: 350,
        width: 350,
        marginBottom: '2rem',
      }}
    >
      <CardMedia
        component="img"
        sx={{ height: 300, width: '100%' }}
        image={product.images[0]}
        alt={product.title}
      />
      <CardContent sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6" component="div">
          {product.title}
        </Typography>
        <Typography variant="h6" component="div" sx={{ color: 'red' }}>
          {formatPrice(product.price)}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ProductGridItem;
