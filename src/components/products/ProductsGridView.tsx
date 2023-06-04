import { Link } from 'react-router-dom';
import { Grid } from '@mui/material';
import ProductGridItem from './ProductGridItem';
import { ProductsProps } from '../../types/Product';

const ProductsGridView = ({ products }: ProductsProps) => {
  return (
    <Grid container spacing={2} sx={{ marginTop: '1rem' }}>
      {products.map((product) => (
        <Grid key={product.id} item xs={12} sm={6} md={4}>
          <Link
            to={`/products/${product.id}`}
            style={{ textDecoration: 'none' }}
          >
            <ProductGridItem key={product.id} product={product} />
          </Link>
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductsGridView;
