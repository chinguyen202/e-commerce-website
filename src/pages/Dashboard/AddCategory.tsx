import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { toast } from 'react-toastify';
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
import {
  fetchCategories,
  deleteCategory,
  createCategory,
  updateCategory,
} from '../../store/store';
import { FormRow, UploadFileFormRow } from '../../components';
import { uploadFile } from '../../utils/helpers';
import { Category } from '../../types/Category';

const AddCategory = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const categories = useAppSelector((state) => state.category.categories);
  const currentUser = useAppSelector((state) => state.user.currentUser);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [productFile, setProductFile] = useState<File | null>(null);
  const [editFile, setEditFile] = useState<File | null>(null);
  const [categoryName, setCategoryName] = useState('');
  const [currentName, setCurrentName] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState(0);
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

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setProductFile(e.target.files[0]);
    }
  };

  const handleEditFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setEditFile(e.target.files[0]);
    }
  };

  const handleEditCategory = (category: Category) => {
    if (currentUser?.role === 'admin') {
      setSelectedCategoryId(category.id);
      setCurrentName(category.name);
      setIsEditModalOpen(true);
    } else {
      toast.error('You should not do this');
    }
  };

  const handleDeleteCategory = (categoryId: number) => {
    if (currentUser?.role === 'admin') {
      dispatch(deleteCategory(categoryId));
    } else {
      toast.error('Only admin can do this');
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (productFile) {
        const url = await uploadFile(productFile);
        if (url) {
          dispatch(createCategory({ name: categoryName, image: url }));
        } else {
          toast.error('Error in uploading images');
        }
      }
      setProductFile(null);
    } catch (error) {
      console.log(error);
      toast.error('Error in creating category');
    }
  };

  const handleEditSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (editFile) {
        const url = await uploadFile(editFile);
        if (url) {
          dispatch(
            updateCategory({
              id: selectedCategoryId,
              name: currentName,
              image: url,
            })
          );
        } else {
          toast.error('Error in uploading images');
        }
      }
      setEditFile(null);
      handleCloseModal();
    } catch (error) {
      console.log(error);
      toast.error('Error in editing category');
    }
  };

  const handleCloseModal = () => {
    setSelectedCategoryId(0);
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
                </TableCell>
                <TableCell sx={{ fontSize: '1.2rem' }}>
                  {category.name}
                </TableCell>
                <TableCell sx={{ fontSize: '1.2rem' }}>
                  <IconButton onClick={() => handleEditCategory(category)}>
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
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1rem',
          padding: '1rem',
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
          type="submit"
          variant="contained"
          color="secondary"
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
          component="form"
          onSubmit={handleEditSubmit}
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
          {/* Edit category form */}
          <UploadFileFormRow handleFileChange={handleEditFileChange} />
          <FormRow
            labelText="Category name"
            name="name"
            type="text"
            value={currentName}
            handleChange={(e) => setCurrentName(e.target.value)}
          />
          <Button variant="contained" color="primary" type="submit">
            Save
          </Button>
        </Box>
      </Modal>
    </Container>
  );
};

export default AddCategory;
