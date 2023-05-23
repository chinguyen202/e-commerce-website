import { Link } from 'react-router-dom';
import { Grid } from '@mui/material';
import ProductItem from './ProductItem';
import { Product } from '../types/Product';

type ProductListProps = {
  products: Product[];
};

const ProductList = ({ products }: ProductListProps) => {
  return (
    <Grid container spacing={2}>
      {products.map((product) => (
        <Grid key={product.id} item xs={12} sm={6} md={4}>
          <Link
            to={`/products/${product.id}`}
            style={{ textDecoration: 'none' }}
          >
            <ProductItem key={product.id} product={product} />
          </Link>
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductList;
