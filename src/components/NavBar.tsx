import * as React from 'react';
import { useState } from 'react';
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
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { links } from '../utils/constants';

type NavBarProps = {
  mode: 'light' | 'dark';
  setMode: (mode: 'light' | 'dark') => void;
};

const NavBar = ({ mode, setMode }: NavBarProps) => {
  const theme = useTheme();
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleModeChange = () => {
    setMode(mode === 'light' ? 'dark' : 'light');
  };
  return (
    <AppBar position="static">
      <Container maxWidth={false}>
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {links.map((link) => (
                <Link
                  to={link.url}
                  style={{
                    textDecoration: 'none',
                    color: theme.palette.secondary.main,
                  }}
                >
                  <MenuItem key={link.id} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{link.text}</Typography>
                  </MenuItem>
                </Link>
              ))}
            </Menu>
          </Box>

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
                  display: { xs: 'none', md: 'flex' },
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
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  textDecoration: 'none',
                  color: 'inherit',
                  display: { xs: 'none', md: 'flex' },
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
            {links.map((page) => (
              <Link
                to={page.url}
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
                  {page.text}
                </Typography>
              </Link>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Link to="/cart">
              <Tooltip title="Cart">
                <IconButton sx={{ p: 0, marginRight: '1rem' }}>
                  <ShoppingCartIcon sx={{ fontSize: 40 }} color="secondary" />
                  <span className="cart-value">12</span>{' '}
                </IconButton>
              </Tooltip>
            </Link>
            <Link to="/login">
              <Tooltip title="Login">
                <IconButton sx={{ p: 0, marginRight: '1rem' }}>
                  <AccountCircleIcon sx={{ fontSize: 40 }} color="secondary" />
                </IconButton>
              </Tooltip>
            </Link>
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
