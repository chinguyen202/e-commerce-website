import { useEffect } from 'react';
import useAppSelector from '../hooks/useAppSelector';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { fetchProducts } from '../store/store';
import { CurrentLocation, ProductList } from '../components';

const Products = () => {
  const allProducts = useAppSelector((state) => state.products.products);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  return (
    <>
      <CurrentLocation name="Products" singleProduct={false} />
      <ProductList products={allProducts} />
    </>
  );
};

export default Products;
