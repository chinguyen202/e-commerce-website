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
    filterOptions,
  } = useAppSelector((state) => state.products);
  // const allProducts = useAppSelector((state) => state.products.products);
  // const gridView = useAppSelector((state) => state.products.gridView);
  // const isSort = useAppSelector((state) => state.products.isSort);
  // const sortProducts = useAppSelector((state) => state.products.sortedProducts);
  // const isFilter = useAppSelector((state) => state.products.isFilter);
  // const filterProducts = useAppSelector(
  //   (state) => state.products.filterProducts
  // );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [
    dispatch,
    products,
    isSort,
    sortedProducts,
    isFilter,
    filterProducts,
    filterOptions,
  ]);
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
