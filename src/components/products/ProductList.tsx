import { Typography } from '@mui/material';
import { Product } from '../../types/Product';
import { ProductsGridView, ProductsListView } from '..';

type ProductsListProps = {
  products: Product[];
  gridView: boolean;
  isLoading: boolean;
};

const ProductList = ({ products, gridView, isLoading }: ProductsListProps) => {
  if (products.length < 1 && !isLoading) {
    return <Typography variant="h4"> Sorry, no product found.</Typography>;
  }

  if (!gridView) {
    return <ProductsListView products={products} />;
  }
  return <ProductsGridView products={products} />;
};

export default ProductList;
