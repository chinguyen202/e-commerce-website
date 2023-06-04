import { useState } from 'react';
import {
  Container,
  IconButton,
  Box,
  Typography,
  Divider,
  useTheme,
  Menu,
  MenuItem,
} from '@mui/material';
import GridViewIcon from '@mui/icons-material/GridView';
import ListIcon from '@mui/icons-material/List';
import SortIcon from '@mui/icons-material/Sort';
import { Product } from '../../types/Product';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { sortProducts, setGridView } from '../../store/reducers/productsSlice';

type SortProps = {
  products: Product[];
  gridView: boolean;
};

const Sort = ({ products, gridView }: SortProps) => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedOption, setSelectedOption] = useState('');

  const handleClickGrid = () => {
    dispatch(setGridView(true));
  };
  const handleClickList = () => {
    dispatch(setGridView(false));
  };

  const handleSortMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSortMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSortOptionClick = (option: string) => {
    setSelectedOption(option);
    let sortType:
      | 'NAME_ASC'
      | 'NAME_DESC'
      | 'PRICE_LOWEST'
      | 'PRICE_HIGHEST'
      | 'UNKNOWN' = 'UNKNOWN';

    switch (option) {
      case 'name ascending':
        sortType = 'NAME_ASC';
        break;
      case 'name descending':
        sortType = 'NAME_DESC';
        break;
      case 'price ascending':
        sortType = 'PRICE_LOWEST';
        break;
      case 'price descending':
        sortType = 'PRICE_HIGHEST';
        break;
      default:
        break;
    }
    if (sortType !== 'UNKNOWN') dispatch(sortProducts({ sortType }));
    handleSortMenuClose();
  };

  return (
    <Container maxWidth={false} sx={{ mt: '2rem' }}>
      <Box sx={{ display: 'flex' }}>
        <Box>
          <IconButton
            onClick={handleClickGrid}
            sx={{
              bgcolor: gridView ? theme.palette.secondary.main : 'inherit',
              color: gridView ? theme.palette.primary.main : 'inherit',
            }}
          >
            <GridViewIcon sx={{ fontSize: 24, marginRight: '0.5rem' }} />
          </IconButton>
          <IconButton
            onClick={handleClickList}
            sx={{
              bgcolor: !gridView ? theme.palette.secondary.main : 'inherit',
              color: !gridView ? theme.palette.primary.main : 'inherit',
            }}
          >
            <ListIcon sx={{ fontSize: 26, marginRight: '0.5rem' }} />
          </IconButton>
        </Box>
        <Box sx={{ marginLeft: '2rem' }}>
          <Typography variant="h6" sx={{ color: theme.palette.secondary.main }}>
            {products.length} products found
          </Typography>
        </Box>
        <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center' }}>
          <Box
            component="div"
            sx={{
              color: theme.palette.secondary.main,
              bgcolor: theme.palette.primary.main,
              padding: '0.5rem 1rem',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
            }}
            onClick={handleSortMenuOpen}
          >
            <SortIcon sx={{ fontSize: 24, marginRight: '0.5rem' }} />
            <Typography variant="h6">Sort by</Typography>
            <Typography variant="body1" sx={{ ml: '0.5rem' }}>
              {selectedOption}
            </Typography>
          </Box>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleSortMenuClose}
          >
            <MenuItem onClick={() => handleSortOptionClick('name ascending')}>
              Name (A-Z)
            </MenuItem>
            <MenuItem onClick={() => handleSortOptionClick('name descending')}>
              Name (Z-A)
            </MenuItem>
            <MenuItem onClick={() => handleSortOptionClick('price ascending')}>
              Price (lowest)
            </MenuItem>
            <MenuItem onClick={() => handleSortOptionClick('price descending')}>
              Price (highest)
            </MenuItem>
          </Menu>
        </Box>
      </Box>
      <Divider />
    </Container>
  );
};

export default Sort;
