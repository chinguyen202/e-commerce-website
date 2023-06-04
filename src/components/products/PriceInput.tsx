import { ChangeEvent } from 'react';
import { TextField, useTheme } from '@mui/material';

type PriceInputProps = {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  label: string;
};

const PriceInput = ({ value, onChange, label }: PriceInputProps) => {
  const theme = useTheme();

  return (
    <TextField
      type="number"
      value={value}
      onChange={onChange}
      label={label}
      variant="outlined"
      sx={{
        ml: '1rem',
        '& .MuiOutlinedInput-root': {
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.secondary.main,
        },
        '& fieldset': {
          borderColor: theme.palette.secondary.main,
        },
        '&::placeholder': {
          color: theme.palette.secondary.main,
        },
      }}
      InputLabelProps={{
        sx: { color: theme.palette.secondary.main },
      }}
    />
  );
};

export default PriceInput;
