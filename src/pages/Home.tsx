import { useEffect } from 'react';
import { toast } from 'react-toastify';
import useAppSelector from '../hooks/useAppSelector';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { fetchCategories } from '../store/store';
import { CategoryList, Hero, Loading, SignupPromotion } from '../components';
import Services from '../components/Services';

const Home = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector((state) => state.products.categories);
  const isLoading = useAppSelector((state) => state.products.isLoading);
  const error = useAppSelector((state) => state.products.error);
  const isError = useAppSelector((state) => state.products.isError);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    toast.error(error);
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
