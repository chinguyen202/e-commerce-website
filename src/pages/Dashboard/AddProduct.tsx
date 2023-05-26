import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { UploadFileFormRow, FormRow } from '../../components';
import useAppSelector from '../../hooks/useAppSelector';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { createProduct, fetchCategories } from '../../store/store';
import { uploadFile } from '../../utils/helpers';
import { Category } from '../../types/Category';

const AddProduct = () => {
  const dispatch = useAppDispatch();
  const [values, setValues] = useState({
    title: '',
    price: undefined,
    description: '',
  });
  const [categoryId, setCategoryId] = useState<number | undefined>(undefined);
  const [file, setFile] = useState<File | null>(null);
  const { categories } = useAppSelector((state) => state.category);

  useEffect(() => {
    if (categories.length === 0) {
      dispatch(fetchCategories());
    }
  }, [categories, dispatch]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSelect = (category: Category) => {
    setCategoryId(category.id);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (file) {
        const url = await uploadFile(file);
        if (url) {
          dispatch(
            createProduct({
              ...values,
              price: parseInt(values.price ?? '0'),
              categoryId: categoryId,
              images: [url],
            })
          );
        }
      }
    } catch (error) {}
  };

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
        name="title"
        type="text"
        value={values.title}
        handleChange={handleInputChange}
      />
      <FormRow
        labelText="Price"
        name="price"
        type="number"
        value={values.price ?? ''}
        handleChange={handleInputChange}
      />
      <FormRow
        labelText="Description"
        name="description"
        type="text"
        value={values.description}
        handleChange={handleInputChange}
      />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignContent: 'flex-start',
        }}
      >
        <Button color="secondary" sx={{ fontSize: '1.2rem' }}>
          Select categories
        </Button>
        {categories.map((category) => (
          <Button
            color="primary"
            sx={{ fontSize: '1.2rem', bgcolor: '#a3b18a', mr: '1rem' }}
            key={category.id}
            onClick={() => handleSelect(category)}
          >
            {category.name}
          </Button>
        ))}
      </Box>
      <UploadFileFormRow handleFileChange={handleFileChange} />
      <Button
        type="submit"
        variant="contained"
        color="secondary"
        sx={{ mt: '2rem' }}
      >
        Submit
      </Button>
    </Box>
  );
};

export default AddProduct;
