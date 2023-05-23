import { TextField, Container, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

type SearchBoxProps = {
  query: string;
  setQuery: (query: string) => void;
  handleSearch: () => void;
};

const SearchBox = ({ setQuery, query, handleSearch }: SearchBoxProps) => {
  return (
    <Container>
      <TextField
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={handleSearch}
        placeholder="Search..."
        variant="outlined"
        size="medium"
        sx={{}}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    </Container>
  );
};

export default SearchBox;
