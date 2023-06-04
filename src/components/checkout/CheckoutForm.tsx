import { useState, Fragment } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  Stepper,
  Step,
  StepLabel,
  useTheme,
  Theme,
} from '@mui/material';
import { AddressForm, PaymentForm } from '../index';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { clearCart } from '../../store/reducers/cartSlice';

const steps = ['Shipping address', 'Payment details'];
function getStepContent(step: number) {
  switch (step) {
    case 0:
      return <AddressForm />;
    case 1:
      return <PaymentForm />;
    default:
      throw new Error('Unknown step');
  }
}

const CheckoutForm = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const [activeStep, setActiveStep] = useState<number>(0);

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      dispatch(clearCart());
    }
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <Container
      maxWidth={false}
      sx={{ height: '100vh', bgcolor: theme.palette.primary.main }}
    >
      <Paper
        variant="outlined"
        sx={{
          my: { xs: 3, md: 6 },
          p: { xs: 2, md: 3 },
          color: theme.palette.secondary.main,
          bgcolor: 'inherit',
        }}
      >
        <Typography component="h1" variant="h3" align="center">
          Checkout
        </Typography>
        <Stepper
          activeStep={activeStep}
          sx={{ pt: 3, pb: 5, fontSize: '1.2rem' }}
        >
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length ? (
          <Fragment>
            <Typography variant="h5" gutterBottom>
              Thank you for your order.
            </Typography>
            <Typography variant="body1">
              Your order number is #2001539. We have emailed your order
              confirmation, and will send you an update when your order has
              shipped.
            </Typography>
          </Fragment>
        ) : (
          <Fragment>
            {getStepContent(activeStep)}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              {activeStep !== 0 && (
                <Button
                  onClick={handleBack}
                  sx={{
                    mt: 3,
                    ml: 1,
                    bgcolor: theme.palette.secondary.main,
                    color: theme.palette.primary.main,
                    fontSize: '1.2rem',
                  }}
                >
                  Back
                </Button>
              )}
              <Button
                variant="contained"
                onClick={handleNext}
                sx={{
                  mt: 3,
                  ml: 1,
                  fontSize: '1.2rem',
                  bgcolor: theme.palette.secondary.main,
                  color: theme.palette.primary.main,
                }}
              >
                {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
              </Button>
            </Box>
          </Fragment>
        )}
      </Paper>
    </Container>
  );
};

export default CheckoutForm;
