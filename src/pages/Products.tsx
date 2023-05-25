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

const Products = () => {
  const {
    products,
    gridView,
    isSort,
    sortedProducts,
    isFilter,
    filterProducts,
  } = useAppSelector((state) => state.products);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  return (
    <>
      <CurrentLocation name="Products" singleProduct={false} />
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <FilterProductsSideBar products={products} />
        </Grid>
        <Grid item xs={9}>
          {isFilter && !isSort && (
            <>
              <Sort products={filterProducts} gridView={gridView} />
              <ProductList products={filterProducts} gridView={gridView} />
            </>
          )}
          {isFilter && isSort && (
            <>
              <Sort products={filterProducts} gridView={gridView} />
              <ProductList products={sortedProducts} gridView={gridView} />
            </>
          )}
          {isSort && !isFilter && (
            <>
              <Sort products={products} gridView={gridView} />
              <ProductList products={sortedProducts} gridView={gridView} />
            </>
          )}
          {!isSort && !isFilter && (
            <>
              <Sort products={products} gridView={gridView} />
              <ProductList products={products} gridView={gridView} />
            </>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default Products;
