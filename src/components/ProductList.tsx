import { Link } from 'react-router-dom';
import {
  Box,
  Container,
  Divider,
  Grid,
  IconButton,
  Typography,
} from '@mui/material';
import GridViewIcon from '@mui/icons-material/GridView';
import ListIcon from '@mui/icons-material/List';
import ProductGridItem from './ProductGridItem';
import { Product } from '../types/Product';

type ProductListProps = {
  products: Product[];
};

const ProductList = ({ products }: ProductListProps) => {
  return (
    <Container maxWidth={false} sx={{ margin: '2rem' }}>
      <Box sx={{ display: 'flex' }}>
        <Box>
          <GridViewIcon sx={{ fontSize: 24, marginRight: '0.5rem' }} />
          <ListIcon sx={{ fontSize: 26, marginRight: '0.5rem  ' }} />
        </Box>
        <Box>
          <Typography variant="h6" sx={{}}>
            {products.length} products found
          </Typography>
        </Box>
      </Box>
      <Divider />
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
    </Container>
  );
};

export default ProductList;
