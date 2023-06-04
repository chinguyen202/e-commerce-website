import { TextField, useTheme } from '@mui/material';

type CustomTextFieldProps = {
  id: string;
  label: string;
  fullWidth?: boolean;
  autoComplete?: string;
  helperText?: string;
};

const CustomTextField = ({
  id,
  label,
  fullWidth = true,
  autoComplete,
  helperText,
}: CustomTextFieldProps) => {
  const theme = useTheme();

  return (
    <TextField
      required
      id={id}
      label={label}
      fullWidth={fullWidth}
      autoComplete={autoComplete}
      variant="standard"
      helperText={helperText}
      InputLabelProps={{
        sx: {
          color: theme.palette.secondary.main,
        },
      }}
      FormHelperTextProps={{
        sx: {
          color: theme.palette.secondary.main,
        },
      }}
    />
  );
};

export default CustomTextField;
