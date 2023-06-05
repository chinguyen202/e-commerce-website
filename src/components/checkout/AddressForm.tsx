import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import AddressFormTextField from './AddressFormTextField';

const AddressForm = () => {
  return (
    <React.Fragment>
      <Typography variant="h5" gutterBottom>
        Shipping address
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <AddressFormTextField
            id="firstName"
            name="firstName"
            label="First name"
            autoComplete="first-name"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <AddressFormTextField
            id="lastName"
            name="lastName"
            label="Last name"
            autoComplete="family-name"
          />
        </Grid>
        <Grid item xs={12}>
          <AddressFormTextField
            id="address1"
            name="address1"
            label="Address line 1"
            autoComplete="shipping address-line1"
          />
        </Grid>
        <Grid item xs={12}>
          <AddressFormTextField
            id="address2"
            name="address2"
            label="Address line 2"
            autoComplete="shipping address-line2"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <AddressFormTextField
            id="city"
            name="city"
            label="City"
            autoComplete="shipping address-level2"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <AddressFormTextField
            id="state"
            name="state"
            label="State/Province/Region"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <AddressFormTextField
            id="zip"
            name="zip"
            label="Zip / Postal code"
            autoComplete="shipping postal-code"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <AddressFormTextField
            id="country"
            name="country"
            label="Country"
            autoComplete="shipping country"
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                color="secondary"
                name="saveAddress"
                value="yes"
                sx={{ color: 'inherit' }}
              />
            }
            label="Use this address for payment details"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default AddressForm;
