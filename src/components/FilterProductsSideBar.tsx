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
import { searchProduct } from '../store/reducers/productsSlice';
import useAppSelector from '../hooks/useAppSelector';
import { fetchCategories } from '../store/store';

const FilterProductsSideBar = ({ products }: ProductsProps) => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const categories = useAppSelector((state) => state.products.categories);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [priceRange, setPriceRange] = useState([
    0,
    Math.max(...products.map((p) => p.price)),
  ]);

  if (categories.length === 0) {
    dispatch(fetchCategories());
  }
  const handleSearch = () => {
    dispatch(searchProduct(searchQuery));
  };

  const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedCategory(event.target.value);
  };

  const handlePriceRangeChange = (
    event: Event,
    newValue: number | number[]
  ) => {
    setPriceRange(newValue as number[]);
  };

  return (
    <Container
      maxWidth={false}
      sx={{ margin: '2rem', color: theme.palette.secondary.main }}
    >
      <SearchBox
        setQuery={setSearchQuery}
        query={searchQuery}
        handleSearch={handleSearch}
      />
      <Typography variant="h6" sx={{ mt: 2 }}>
        Categories
      </Typography>
      <FormGroup>
        {categories.map((category) => (
          <FormControlLabel
            key={category.id}
            control={
              <Checkbox
                checked={selectedCategory === category.name}
                onChange={handleCategoryChange}
                value={category}
              />
            }
            label={category.name}
          />
        ))}
      </FormGroup>
      <Typography variant="h6" sx={{ mt: 2 }}>
        Price Range:
      </Typography>
      <Box sx={{ width: '80%', mx: 'auto' }}>
        <Slider
          value={priceRange}
          onChange={handlePriceRangeChange}
          valueLabelDisplay="auto"
          min={0}
          max={Math.max(...products.map((p) => p.price))}
          sx={{ color: 'secondary' }}
        />
        <Typography variant="body2" sx={{ mt: 2 }}>
          Price Range: {priceRange[0]} - {priceRange[1]}
        </Typography>
      </Box>
      <Box sx={{ mt: 2 }}>
        <Button variant="outlined" onClick={() => console.log('Clear filters')}>
          Clear filters
        </Button>
      </Box>
    </Container>
  );
};

export default FilterProductsSideBar;
