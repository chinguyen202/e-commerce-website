import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Tooltip from '@mui/material/Tooltip';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

type NavBarProps = {
  mode: 'light' | 'dark';
  setMode: (mode: 'light' | 'dark') => void;
};

const NavBar = ({ mode, setMode }: NavBarProps) => {
  const theme = useTheme();

  const handleModeChange = () => {
    setMode(mode === 'light' ? 'dark' : 'light');
  };
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link
            to="/"
            style={{
              textDecoration: 'none',
              color: theme.palette.secondary.main,
            }}
          >
            <Toolbar>
              <Box
                component="img"
                sx={{
                  height: 42,
                  marginRight: '0.5rem',
                }}
                alt="Your logo."
                src={require('../assets/platzi.png')}
              />
              <Typography
                variant="h6"
                noWrap
                component="a"
                className="link-item"
                sx={{
                  mr: 2,
                  display: { xs: 'none', md: 'flex' },
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  textDecoration: 'none',
                  color: 'inherit',
                }}
              >
                Platzi
              </Typography>
            </Toolbar>
          </Link>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: 'none', md: 'flex', margin: '2rem' },
            }}
          >
            <Link
              to="/"
              style={{
                textDecoration: 'none',
                color: theme.palette.secondary.main,
              }}
            >
              <Typography
                variant="h6"
                noWrap
                sx={{
                  mr: 3,
                  display: { xs: 'none', md: 'flex' },
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  textDecoration: 'none',
                  color: 'inherit',
                }}
              >
                Home
              </Typography>
            </Link>
            <Link
              to="/products"
              style={{
                textDecoration: 'none',
                color: theme.palette.secondary.main,
              }}
            >
              <Typography
                variant="h6"
                noWrap
                sx={{
                  mr: 3,
                  display: { xs: 'none', md: 'flex' },
                  fontWeight: 700,
                  letterSpacing: '.2rem',
                  textDecoration: 'none',
                  color: 'secondary',
                }}
              >
                Products
              </Typography>
            </Link>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Cart">
              <IconButton sx={{ p: 0, marginRight: '1rem' }}>
                <ShoppingCartIcon sx={{ fontSize: 40 }} color="secondary" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Login">
              <IconButton sx={{ p: 0, marginRight: '1rem' }}>
                <AccountCircleIcon sx={{ fontSize: 40 }} color="secondary" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Change Mode">
              <IconButton sx={{ p: 0 }} onClick={handleModeChange}>
                {mode === 'light' ? (
                  <LightModeIcon sx={{ fontSize: 40 }} color="secondary" />
                ) : (
                  <DarkModeIcon sx={{ fontSize: 40 }} color="secondary" />
                )}
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default NavBar;
