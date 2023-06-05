import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import CustomTextField from './CustomTextField';

const PaymentForm = () => {
  return (
    <>
      <Typography variant="h5" gutterBottom>
        Payment method
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <CustomTextField
            id="cardName"
            label="Name on card"
            autoComplete="cc-name"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomTextField
            id="cardNumber"
            label="Card Number"
            autoComplete="cc-number"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomTextField
            id="expDate"
            label="Expiry date"
            autoComplete="cc-exp"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomTextField
            id="cvv"
            label="CVV"
            autoComplete="cc-csc"
            helperText="Last three digits on signature strip"
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                color="secondary"
                name="saveCard"
                value="yes"
                sx={{ color: 'inherit' }}
              />
            }
            label="Remember credit card details for next time"
          />
        </Grid>
      </Grid>
    </>
  );
};

export default PaymentForm;
