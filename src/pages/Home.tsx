import { CategoryList, Hero, SignupPromotion } from '../components';
import Services from '../components/Services';

const Home = () => {
  return (
    <>
      <Hero />
      <CategoryList />
      <Services />
      <SignupPromotion />
    </>
  );
};

export default Home;
