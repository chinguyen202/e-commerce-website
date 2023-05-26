import { ChangeEvent, useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Select,
  MenuItem,
  InputLabel,
} from '@mui/material';
import { UploadFileFormRow, FormRow } from '../../components';
import useAppSelector from '../../hooks/useAppSelector';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { fetchCategories } from '../../store/store';
import { Category } from '../../types/Category';

const AddProduct = () => {
  const dispatch = useAppDispatch();
  const [values, setValues] = useState({
    name: '',
    price: 0,
    description: '',
    categoryId: 0,
  });
  const { categories } = useAppSelector((state) => state.category);
  useEffect(() => {
    if (categories.length === 0) {
      dispatch(fetchCategories());
    }
  }, [categories, dispatch]);
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {};
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {};

  const handleSubmit = () => {};

  return (
    <Box
      component="form"
      noValidate
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1rem',
        padding: '1rem',
        // boxShadow: 1,
        borderRadius: '4px',
        bgcolor: 'background.paper',
      }}
    >
      <Typography variant="h4" sx={{ mb: '2rem' }}>
        Add a new product
      </Typography>
      <FormRow
        labelText="Product name"
        name="name"
        type="text"
        value={values.name}
        handleChange={handleInputChange}
      />
      <FormRow
        labelText="Price"
        name="price"
        type="number"
        value={String(values.price)}
        handleChange={handleInputChange}
      />
      <FormRow
        labelText="Description"
        name="description"
        type="text"
        value={values.description}
        handleChange={handleInputChange}
      />

      <UploadFileFormRow handleFileChange={handleFileChange} />
      <Button
        variant="contained"
        color="secondary"
        onClick={handleSubmit}
        sx={{ mt: '2rem' }}
      >
        Submit
      </Button>
    </Box>
  );
};

export default AddProduct;
