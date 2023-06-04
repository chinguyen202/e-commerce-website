import { useEffect, useState, ChangeEvent } from 'react';
import {
  Container,
  Typography,
  Box,
  FormGroup,
  Checkbox,
  FormControlLabel,
  TextField,
  useTheme,
  Button,
} from '@mui/material';
import { SearchBox, PriceInput } from '../index';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { fetchCategories } from '../../store/store';
import {
  updateFilters,
  searchProduct,
  filterProductByCategory,
  filterProductByPriceRange,
} from '../../store/reducers/productsSlice';
import { Category } from '../../types/Category';

interface FilterProductsSideBarProps {
  categories: Category[];
}

const FilterProductsSideBar = ({ categories }: FilterProductsSideBarProps) => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [priceRange, setPriceRange] = useState(['', '']);

  useEffect(() => {
    if (categories.length === 0) dispatch(fetchCategories());
  });

  const setQuery = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearchQuery(e.target.value);
  };

  const handleSearch = () => {
    dispatch(searchProduct(searchQuery));
    setSearchQuery('');
  };

  const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const categoryName = event.target.value;
    const selectedCategory = categories.find(
      (category) => category.name === categoryName
    );
    if (selectedCategory) {
      setSelectedCategory(selectedCategory);
      dispatch(
        updateFilters({
          minPrice: parseInt(priceRange[0]),
          maxPrice: parseInt(priceRange[1]),
          category: selectedCategory || null,
        })
      );
      dispatch(filterProductByCategory(selectedCategory));
    }
  };

  const handlePriceRangeChange = () => {
    dispatch(
      updateFilters({
        minPrice: parseInt(priceRange[0]),
        maxPrice: parseInt(priceRange[1]),
        category: selectedCategory || null,
      })
    );
    dispatch(
      filterProductByPriceRange({
        minPrice: parseInt(priceRange[0]),
        maxPrice: parseInt(priceRange[1]),
        category: selectedCategory || null,
      })
    );
  };

  const clearFilters = () => {
    setPriceRange(['', '']);
    setSelectedCategory(null);
    dispatch({ type: 'products/clearFilters' });
  };

  return (
    <Container
      maxWidth={false}
      sx={{
        margin: '2rem',
        color: theme.palette.secondary.main,
        bgcolor: theme.palette.primary.main,
      }}
    >
      <SearchBox
        handleSearch={handleSearch}
        query={searchQuery}
        setQuery={setQuery}
      />
      <Box sx={{ mt: '2rem' }}>
        <Typography variant="h6">Categories</Typography>
        <FormGroup>
          {categories.map((category) => (
            <FormControlLabel
              key={category.id}
              control={
                <Checkbox
                  checked={selectedCategory === category}
                  onChange={handleCategoryChange}
                  value={category.name}
                  sx={{ color: theme.palette.secondary.main }}
                />
              }
              label={category.name}
            />
          ))}
        </FormGroup>
      </Box>
      <Typography variant="h6" sx={{ mt: 2 }}>
        Price Range:
      </Typography>
      <Box sx={{ width: '80%', mt: '2rem' }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <PriceInput
            label="Min Price"
            value={priceRange[0]}
            onChange={(e) => setPriceRange([e.target.value, priceRange[1]])}
          />
          <PriceInput
            label="Max Price"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], e.target.value])}
          />
        </Box>
        <Button
          variant="outlined"
          onClick={handlePriceRangeChange}
          sx={{
            color: theme.palette.primary.main,
            bgcolor: theme.palette.secondary.main,
            mt: '1rem',
            fontSize: '1.2rem',
          }}
        >
          Apply Price Range
        </Button>
      </Box>
      <Box sx={{ mt: '2rem' }}>
        <Button
          variant="outlined"
          onClick={clearFilters}
          sx={{
            color: theme.palette.primary.main,
            bgcolor: theme.palette.secondary.main,
            fontSize: '1.2rem',
          }}
        >
          Clear filters
        </Button>
      </Box>
    </Container>
  );
};

export default FilterProductsSideBar;
