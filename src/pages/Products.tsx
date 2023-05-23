import { useEffect } from 'react';
import { Grid } from '@mui/material';
import useAppSelector from '../hooks/useAppSelector';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { fetchProducts } from '../store/store';
import {
  CurrentLocation,
  ProductList,
  FilterProductsSideBar,
  Sort,
} from '../components';
import useThunk from '../hooks/useThunk';

const Products = () => {
  const allProducts = useAppSelector((state) => state.products.products);
  const gridView = useAppSelector((state) => state.products.gridView);
  const isSort = useAppSelector((state) => state.products.isSort);
  const sortProducts = useAppSelector((state) => state.products.sortedProducts);
  const isFilter = useAppSelector((state) => state.products.isFilter);
  const filterProducts = useAppSelector(
    (state) => state.products.filterProducts
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch, allProducts, isSort, sortProducts]);
  return (
    <>
      <CurrentLocation name="Products" singleProduct={false} />
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <FilterProductsSideBar />
        </Grid>
        <Grid item xs={9}>
          <Sort products={allProducts} gridView={gridView} />
          {isSort && (
            <ProductList products={sortProducts} gridView={gridView} />
          )}
          {!(isSort && isFilter) && (
            <ProductList products={allProducts} gridView={gridView} />
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default Products;
