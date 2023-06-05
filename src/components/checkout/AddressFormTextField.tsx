import { useTheme, TextField } from '@mui/material';

const AddressFormTextField = ({ ...props }) => {
  const theme = useTheme();
  return (
    <TextField
      {...props}
      required
      fullWidth
      variant="standard"
      InputLabelProps={{
        style: { color: theme.palette.secondary.main },
      }}
      InputProps={{
        style: { color: theme.palette.secondary.main },
      }}
    />
  );
};

export default AddressFormTextField;
