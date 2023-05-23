import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import {
  Typography,
  Card,
  Box,
  CardMedia,
  CardContent,
  useTheme,
} from '@mui/material';
import useAppSelector from '../hooks/useAppSelector';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { fetchCategories } from '../store/store';
import { ErrorMessage } from '../components';

const carouselSettings = {
  responsive: {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  },
  draggable: true,
  infinite: true,
  keyBoardControl: true,
  renderButtonGroupOutside: false,
  renderDotsOutside: false,
  showDots: false,
  swipeable: true,
};

const CategoryList = () => {
  const theme = useTheme();
  const categories = useAppSelector((state) => state.products.categories);
  const isLoading = useAppSelector((state) => state.products.isLoading);
  const error = useAppSelector((state) => state.products.error);
  const isError = useAppSelector((state) => state.products.isError);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  if (isError) {
    return <ErrorMessage />;
  }

  return (
    <Box
      sx={{
        padding: '2rem',
        margin: '2rem',
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'center',
        textAlign: 'center',
        color: theme.palette.secondary.main,
      }}
    >
      <Typography variant="h3" sx={{ margin: '2rem' }}>
        Categories
      </Typography>
      <Carousel {...carouselSettings}>
        {categories.map((category) => (
          <Link
            key={category.id}
            to="/products"
            style={{ textDecoration: 'none' }}
          >
            <Card
              key={category.id}
              sx={{ marginRight: '2rem', height: 350, width: 350 }}
            >
              <CardMedia
                component="img"
                sx={{ height: 300, aspectRatio: 1 }}
                image={category.image}
                alt={category.name}
              />
              <CardContent>
                <Typography variant="h6" component="div">
                  {category.name}
                </Typography>
              </CardContent>
            </Card>
          </Link>
        ))}
      </Carousel>
    </Box>
  );
};

export default CategoryList;
