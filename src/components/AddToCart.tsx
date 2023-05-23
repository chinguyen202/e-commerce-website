import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Divider, Typography, useTheme } from '@mui/material';
import { Product } from '../types/Product';

type Props = {
  product: Product;
};
const AddToCart = ({ product }: Props) => {
  const theme = useTheme();
  return (
    <Container
      sx={{
        padding: '2rem',
        color: theme.palette.secondary.main,
        bgcolor: theme.palette.primary.main,
      }}
    >
      <Divider />
      <Typography variant="h6">Add To Cart</Typography>
    </Container>
  );
};

export default AddToCart;
