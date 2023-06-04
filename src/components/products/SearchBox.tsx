import { KeyboardEvent, ChangeEvent } from 'react';
import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

type SearchBoxProps = {
  query: string;
  setQuery: (event: ChangeEvent<HTMLInputElement>) => void;
  handleSearch: () => void;
};

const SearchBox = ({ setQuery, query, handleSearch }: SearchBoxProps) => {
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };
  return (
    <>
      <TextField
        value={query}
        onKeyDown={handleKeyDown}
        onChange={setQuery}
        placeholder="Search..."
        variant="outlined"
        size="medium"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    </>
  );
};

export default SearchBox;
