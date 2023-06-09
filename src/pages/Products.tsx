import { useEffect } from 'react';
import { Container, Grid, Skeleton, useTheme } from '@mui/material';
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
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const {
    products,
    gridView,
    isSort,
    isLoading,
    sortedProducts,
    isFilter,
    filterProducts,
  } = useAppSelector((state) => state.products);
  const categories = useAppSelector((state) => state.category.categories);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch, filterProducts, sortedProducts, isFilter, isSort]);

  return (
    <>
      <CurrentLocation name="Products" singleProduct={false} />
      <Grid container spacing={2} sx={{ bgcolor: theme.palette.primary.main }}>
        <Grid item xs={3}>
          <FilterProductsSideBar categories={categories} />
        </Grid>
        <Grid item xs={9}>
          {isFilter && !isSort && (
            <>
              <Sort products={filterProducts} gridView={gridView} />
              <ProductList
                products={filterProducts}
                gridView={gridView}
                isLoading={isLoading}
              />
            </>
          )}
          {isFilter && isSort && (
            <>
              <Sort products={filterProducts} gridView={gridView} />
              <ProductList
                products={sortedProducts}
                gridView={gridView}
                isLoading={isLoading}
              />
            </>
          )}
          {isSort && !isFilter && (
            <>
              <Sort products={products} gridView={gridView} />
              <ProductList
                products={sortedProducts}
                gridView={gridView}
                isLoading={isLoading}
              />
            </>
          )}
          {!isSort && !isFilter && (
            <>
              <Sort products={products} gridView={gridView} />
              <ProductList
                products={products}
                gridView={gridView}
                isLoading={isLoading}
              />
            </>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default Products;
