import { ChangeEvent } from 'react';
import { TextField, useTheme } from '@mui/material';

type Props = {
  name: string;
  value: string;
  labelText: string;
  type: string;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const FormRow = ({ name, value, labelText, type, handleChange }: Props) => {
  const theme = useTheme();
  return (
    <TextField
      margin="normal"
      required
      fullWidth
      type={type}
      label={labelText}
      name={name}
      onChange={handleChange}
      value={value}
      autoComplete={name}
    />
  );
};

export default FormRow;
