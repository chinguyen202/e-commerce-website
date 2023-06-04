import { useEffect } from 'react';
import { Container, useTheme } from '@mui/material';
import useAppSelector from '../hooks/useAppSelector';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { fetchCategories } from '../store/store';
import { CategoryList, Hero, Loading, SignupPromotion } from '../components';
import Services from '../components/home/Services';

const Home = () => {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const { categories, isLoading } = useAppSelector((state) => state.category);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Container maxWidth={false} sx={{ bgcolor: theme.palette.primary.main }}>
      <Hero />
      <CategoryList categories={categories} />
      <Services />
      <SignupPromotion />
    </Container>
  );
};

export default Home;
