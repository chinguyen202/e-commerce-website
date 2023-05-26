import { CheckoutForm, CurrentLocation } from '../components';

const Checkout = () => {
  return (
    <>
      <CurrentLocation name="Checkout" singleProduct={false} />
      <CheckoutForm />
    </>
  );
};

export default Checkout;
