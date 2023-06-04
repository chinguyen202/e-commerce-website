import { useEffect } from 'react';
import { Box, Container, useTheme } from '@mui/material';
import { useParams } from 'react-router-dom';
import {
  AddToCart,
  CurrentLocation,
  Loading,
  ProductDetail,
  ProductImages,
} from '../components';
import useAppSelector from '../hooks/useAppSelector';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { fetchSingleProduct } from '../store/store';
import { toast } from 'react-toastify';

const SingleProduct = () => {
  const { id } = useParams();
  const { product, isLoading, isError, error } = useAppSelector(
    (state) => state.products
  );

  const dispatch = useAppDispatch();
  const theme = useTheme();

  useEffect(() => {
    if (id) dispatch(fetchSingleProduct(id));
  }, [id, dispatch]);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    toast.error(error);
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
            bgcolor: theme.palette.primary.main,
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
            <AddToCart item={product} isProductPage={true} />
          </Box>
        </Container>
      )}
    </>
  );
};

export default SingleProduct;
