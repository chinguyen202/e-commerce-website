import { Card, CardMedia, CardContent, Typography } from '@mui/material';
import { Product } from '../types/Product';

type ProductItemProps = {
  product: Product;
};

const ProductItem = ({ product }: ProductItemProps) => {
  return (
    <Card
      key={product.id}
      sx={{ marginRight: '2rem', height: 350, width: 350 }}
    >
      <CardMedia
        component="img"
        sx={{ height: 300, aspectRatio: 1 }}
        image={product.images[0]}
        alt={product.title}
      />
      <CardContent>
        <Typography variant="h6" component="div">
          {product.title}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ProductItem;
