import { Box, Typography } from '@mui/material';
import React from 'react';

type Props = {
  error?: string;
};

const ErrorMessage = ({ error }: Props) => {
  return (
    <Box>
      <Typography>{error}</Typography>
    </Box>
  );
};
export default ErrorMessage;
