import React, { useState } from 'react';
import { Container, Box } from '@mui/material';

type Props = {
  images: string[];
};

const ProductImages = ({ images }: Props) => {
  console.log(images);
  const [main, setMain] = useState<string>(images[0]);
  return (
    <Box>
      <Box
        component="img"
        sx={{
          width: '100%',
          height: '50vh',
          objectFit: 'cover',
          padding: '2rem',
          borderRadius: '3rem',
        }}
        alt="product image"
        src={main}
      />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          margin: '2rem',
        }}
      >
        {images.map((image, index) => (
          <Box
            onClick={() => setMain(image)}
            key={index}
            component="img"
            sx={{
              width: `calc(100% / ${images.length})`,
              height: 'auto',
              objectFit: 'cover',
              marginRight: '2rem',
              borderRadius: '1rem',
              display: { xs: 'none', md: 'flex' },
            }}
            alt="product image"
            src={image}
          />
        ))}
      </Box>
    </Box>
  );
};

export default ProductImages;
