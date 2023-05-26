// import { ChangeEvent, useState } from 'react';
// import { Box, Typography, Button } from '@mui/material';
// import { UploadFileFormRow, FormRow } from '../../components';

// const AddCategory = () => {
//   const [categoryName, setCategoryName] = useState<string>('');
//   const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {};
//   const handleSubmit = () => {};

//   return (
//     <Box
//       component="form"
//       noValidate
//       onSubmit={handleSubmit}
//       sx={{
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//         gap: '1rem',
//         padding: '1rem',
//         // boxShadow: 1,
//         borderRadius: '4px',
//         bgcolor: 'background.paper',
//       }}
//     >
//       <Typography variant="h4" sx={{ mb: '2rem' }}>
//         Add a new category
//       </Typography>
//       <UploadFileFormRow handleFileChange={handleFileChange} />
//       <FormRow
//         labelText="Category name"
//         name="name"
//         type="text"
//         value={categoryName}
//         handleChange={(e) => setCategoryName(e.target.value)}
//       />
//       <Button
//         variant="contained"
//         color="secondary"
//         onClick={handleSubmit}
//         sx={{ mt: '2rem' }}
//       >
//         Submit
//       </Button>
//     </Box>
//   );
// };

// export default AddCategory;

import { useState, useEffect } from 'react';
import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  IconButton,
  Modal,
  Box,
  Typography,
  Button,
  CardMedia,
  Container,
  useTheme,
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import useAppSelector from '../../hooks/useAppSelector';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { fetchCategories, deleteCategory } from '../../store/store';
import { FormRow, UploadFileFormRow } from '../../components';

const AddCategory = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const categories = useAppSelector((state) => state.category.categories);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null
  );
  const [categoryName, setCategoryName] = useState('');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Fetch categories on component mount
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFileChange = () => {};

  const handleEditCategory = (categoryId: number) => {
    setSelectedCategoryId(categoryId);
    setIsEditModalOpen(true);
  };

  const handleDeleteCategory = (categoryId: number) => {
    dispatch(deleteCategory(categoryId));
  };

  const handleSubmit = () => {};

  const handleCloseModal = () => {
    setSelectedCategoryId(null);
    setIsEditModalOpen(false);
  };

  const displayedCategories = categories.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Container sx={{ color: theme.palette.secondary.main }}>
      <Typography variant="h4" sx={{ m: '2rem', textAlign: 'center' }}>
        {' '}
        Categories
      </Typography>
      <TableContainer sx={{ ml: '2rem', mr: '2rem' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontSize: '1.2rem', fontWeight: '600' }}>
                Image
              </TableCell>
              <TableCell sx={{ fontSize: '1.2rem', fontWeight: '600' }}>
                Name
              </TableCell>
              <TableCell sx={{ fontSize: '1.2rem', fontWeight: '600' }}>
                Edit
              </TableCell>
              <TableCell sx={{ fontSize: '1.2rem', fontWeight: '600' }}>
                Delete
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedCategories.map((category) => (
              <TableRow key={category.id}>
                <TableCell>
                  <CardMedia
                    component="img"
                    height="50"
                    width="50"
                    image={category.image}
                    alt={category.name}
                    sx={{
                      width: '20%',
                      objectFit: 'cover',
                      marginRight: '2rem',
                      borderRadius: '2rem',
                    }}
                  />
                  {/* <img src={category.image} alt={category.name} /> */}
                </TableCell>
                <TableCell sx={{ fontSize: '1.2rem' }}>
                  {category.name}
                </TableCell>
                <TableCell sx={{ fontSize: '1.2rem' }}>
                  <IconButton onClick={() => handleEditCategory(category.id)}>
                    <Edit />
                  </IconButton>
                </TableCell>
                <TableCell sx={{ fontSize: '1.2rem' }}>
                  <IconButton onClick={() => handleDeleteCategory(category.id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        rowsPerPageOptions={[10, 25, 50]}
        count={categories.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
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
          Add a new category
        </Typography>
        <UploadFileFormRow handleFileChange={handleFileChange} />
        <FormRow
          labelText="Category name"
          name="name"
          type="text"
          value={categoryName}
          handleChange={(e) => setCategoryName(e.target.value)}
        />
        <Button
          variant="contained"
          color="secondary"
          onClick={handleSubmit}
          sx={{ mt: '2rem' }}
        >
          Submit
        </Button>
      </Box>

      <Modal
        open={isEditModalOpen}
        onClose={handleCloseModal}
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <Box
          sx={{
            width: '50%',
            bgcolor: 'white',
            p: 2,
            alignSelf: 'center',
          }}
        >
          <Typography variant="h6" align="center" sx={{ mb: 2 }}>
            Edit Category
          </Typography>
          {/* Edit category form goes here */}
          <UploadFileFormRow handleFileChange={handleFileChange} />
          <FormRow
            labelText="Category name"
            name="name"
            type="text"
            value={categoryName}
            handleChange={(e) => setCategoryName(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleCloseModal}
          >
            Save
          </Button>
        </Box>
      </Modal>
    </Container>
  );
};

export default AddCategory;
