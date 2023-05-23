import { useEffect } from 'react';
import useAppSelector from '../hooks/useAppSelector';
import { useAppDispatch } from '../hooks/useAppDispatch';
import fetchSingleProduct from '../store/thunks/fetchSingleProduct';
import { Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { CurrentLocation, ErrorMessage } from '../components';

const SingleProduct = () => {
  const { id } = useParams();
  console.log('Params - ', id);
  const product = useAppSelector((state) => state.product);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id) dispatch(fetchSingleProduct(id));
  }, [dispatch]);

  if (product.isLoading) {
    return <Typography>Loading...</Typography>;
  }

  if (product.isError) {
    return <ErrorMessage error={product.error} />;
  }
  return (
    <>
      <CurrentLocation
        name={product.product?.title || 'Unknown'}
        singleProduct={true}
      />
      {product.product ? (
        <Typography>{product.product.title}</Typography>
      ) : (
        <Typography>Error</Typography>
      )}
    </>
  );
};

export default SingleProduct;
