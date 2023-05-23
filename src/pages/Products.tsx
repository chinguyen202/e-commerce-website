import { useEffect } from 'react';
import { Grid } from '@mui/material';
import useAppSelector from '../hooks/useAppSelector';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { fetchProducts } from '../store/store';
import {
  CurrentLocation,
  ProductList,
  FilterProductsSideBar,
} from '../components';

const Products = () => {
  const allProducts = useAppSelector((state) => state.products.products);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  return (
    <>
      <CurrentLocation name="Products" singleProduct={false} />
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <FilterProductsSideBar />
        </Grid>
        <Grid item xs={9}>
          <ProductList products={allProducts} />
        </Grid>
      </Grid>
    </>
  );
};

export default Products;
