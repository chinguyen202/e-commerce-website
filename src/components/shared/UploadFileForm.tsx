import { ChangeEvent } from 'react';
import { TextField } from '@mui/material';

type Props = {
  handleFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const UploadFileFormRow = ({ handleFileChange }: Props) => {
  return (
    <TextField
      type="file"
      fullWidth
      onChange={handleFileChange}
      inputProps={{ accept: 'image/*' }} // specify accepted file types, images
    />
  );
};

export default UploadFileFormRow;
