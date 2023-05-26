import { useEffect } from 'react';
import { toast } from 'react-toastify';
import useAppSelector from '../hooks/useAppSelector';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { fetchCategories } from '../store/store';
import { CategoryList, Hero, Loading, SignupPromotion } from '../components';
import Services from '../components/Services';

const Home = () => {
  const dispatch = useAppDispatch();
  const { categories, isLoading } = useAppSelector((state) => state.category);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Hero />
      <CategoryList categories={categories} />
      <Services />
      <SignupPromotion />
    </>
  );
};

export default Home;
