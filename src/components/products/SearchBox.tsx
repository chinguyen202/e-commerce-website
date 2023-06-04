import { KeyboardEvent, ChangeEvent } from 'react';
import { TextField, InputAdornment, useTheme } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

type SearchBoxProps = {
  query: string;
  setQuery: (event: ChangeEvent<HTMLInputElement>) => void;
  handleSearch: () => void;
};

const SearchBox = ({ setQuery, query, handleSearch }: SearchBoxProps) => {
  const theme = useTheme();
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <TextField
      value={query}
      onKeyDown={handleKeyDown}
      onChange={setQuery}
      placeholder="Search..."
      variant="outlined"
      size="medium"
      color="primary"
      sx={{
        '& .MuiOutlinedInput-root': {
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.secondary.main,
        },
        '& fieldset': {
          borderColor: theme.palette.secondary.main,
        },
        '&::placeholder': {
          color: theme.palette.secondary.main,
        },
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start" sx={{ color: 'inherit  ' }}>
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
  );
};

export default SearchBox;
