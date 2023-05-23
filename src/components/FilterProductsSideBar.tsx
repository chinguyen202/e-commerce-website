import { useState } from 'react';
import { ProductsProps } from '../types/Product';
import {
  Container,
  Typography,
  Box,
  Slider,
  FormGroup,
  Checkbox,
  FormControlLabel,
  useTheme,
  Button,
} from '@mui/material';
import SearchBox from './SearchBox';
import { useAppDispatch } from '../hooks/useAppDispatch';
import useAppSelector from '../hooks/useAppSelector';
import { fetchCategories } from '../store/store';
import {
  updateFilters,
  clearFilters,
  searchProduct,
  filterProduct,
} from '../store/reducers/productsSlice';
import { Category } from '../types/Category';

const FilterProductsSideBar = ({ products }: ProductsProps) => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const maxPrice = Math.max(...products.map((p) => p.price));
  const categories = useAppSelector((state) => state.products.categories);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [priceRange, setPriceRange] = useState([0, maxPrice]);
  if (categories.length === 0) {
    dispatch(fetchCategories());
  }
  const handleSearch = () => {
    dispatch(searchProduct(searchQuery));
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
          minPrice: priceRange[0],
          maxPrice: priceRange[1],
          category: selectedCategory || null,
        })
      );
      dispatch(
        filterProduct({
          minPrice: priceRange[0],
          maxPrice: priceRange[1],
          category: selectedCategory || null,
        })
      );
    }
  };

  const handlePriceRangeChange = (
    event: Event,
    newValue: number | number[]
  ) => {
    const newPriceRange = newValue as number[];
    setPriceRange(newPriceRange);
    dispatch(
      updateFilters({
        minPrice: newPriceRange[0],
        maxPrice: newPriceRange[1],
        category: selectedCategory || null,
      })
    );
  };

  const clearFilters = () => {
    setPriceRange([0, maxPrice]);
    setSelectedCategory(null);
    dispatch({ type: 'products/clearFilters' });
  };
  return (
    <Container
      maxWidth={false}
      sx={{
        margin: '2rem',
        color: theme.palette.secondary.main,
      }}
    >
      <SearchBox
        setQuery={setSearchQuery}
        query={searchQuery}
        handleSearch={handleSearch}
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
        <Slider
          value={priceRange}
          onChange={handlePriceRangeChange}
          valueLabelDisplay="auto"
          min={0}
          max={Math.max(...products.map((p) => p.price))}
          sx={{ color: theme.palette.secondary.main }}
        />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <Typography
            variant="body1"
            sx={{ mt: 2, fontSize: '1.2rem', fontWeight: '500' }}
          >
            {priceRange[0]}
          </Typography>
          <Typography
            variant="body1"
            sx={{ mt: 2, fontSize: '1.2rem', fontWeight: '500' }}
          >
            {priceRange[1]}
          </Typography>
        </Box>
      </Box>
      <Box sx={{ mt: '2rem' }}>
        <Button
          variant="outlined"
          onClick={clearFilters}
          sx={{
            color: theme.palette.primary.main,
            bgcolor: theme.palette.secondary.main,
          }}
        >
          Clear filters
        </Button>
      </Box>
    </Container>
  );
};

export default FilterProductsSideBar;
