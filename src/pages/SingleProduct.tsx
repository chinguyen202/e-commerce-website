import { useEffect } from 'react';
import { Box, Container } from '@mui/material';
import { useParams } from 'react-router-dom';
import {
  AddToCart,
  CurrentLocation,
  ErrorMessage,
  Loading,
  ProductDetail,
  ProductImages,
} from '../components';
import useAppSelector from '../hooks/useAppSelector';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { fetchSingleProduct } from '../store/store';
import { CartItemI } from '../types/Cart';

const SingleProduct = () => {
  const { id } = useParams();
  console.log('Params - ', id);
  const productState = useAppSelector((state) => state.products);
  const product = productState.product;
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id) dispatch(fetchSingleProduct(id));
  }, [id, dispatch]);

  if (productState.isLoading) {
    return <Loading />;
  }

  if (productState.isError) {
    return <ErrorMessage error={productState.error} />;
  }
  return (
    <>
      <CurrentLocation
        name={product?.title || 'Unknown'}
        singleProduct={true}
      />
      {product && (
        <Container
          maxWidth={false}
          sx={{
            display: 'flex',
            flexDirection: 'row',
            padding: '2rem',
            marginBottom: '2rem',
          }}
        >
          <Box sx={{ flex: '1' }}>
            <ProductImages images={product.images} />
          </Box>
          <Box sx={{ flex: '1', paddingLeft: '2rem' }}>
            <ProductDetail
              title={product.title}
              price={product.price}
              description={product.description}
              categoryName={product.category.name}
            />
            {/* <AddToCart cartItem={cartItem} /> */}
          </Box>
        </Container>
      )}
    </>
  );
};

export default SingleProduct;
