import { Box, Button, Grid } from '@mui/material';
import LayersIcon from '@mui/icons-material/Layers';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import CategoryIcon from '@mui/icons-material/Category';
import { useAppDispatch } from '../hooks/useAppDispatch';
import useAppSelector from '../hooks/useAppSelector';
import { logoutUser } from '../store/reducers/userSlice';
import SidebarItem from './SidebarItem';
import { useNavigate } from 'react-router-dom';

const DashboardSidebar = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { currentUser } = useAppSelector((state) => state.user);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/');
  };

  return (
    <Grid
      item
      xs={false}
      sm={1}
      md={3}
      sx={{
        backgroundColor: (t) =>
          t.palette.mode === 'light'
            ? t.palette.primary.main
            : t.palette.secondary.main,
      }}
    >
      {currentUser?.role === 'admin' ? (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
          }}
        >
          <SidebarItem
            to="/user/stats"
            icon={<DashboardIcon />}
            primary="Dashboard"
          />
          <SidebarItem
            to="/user/customers"
            icon={<PeopleAltIcon />}
            primary="Customers"
          />
          <SidebarItem
            to="/user/add-category"
            icon={<CategoryIcon />}
            primary="Add Category"
          />
          <SidebarItem
            to="/user/add-product"
            icon={<LayersIcon />}
            primary="Add Product"
          />
        </Box>
      ) : (
        <></>
      )}
      <SidebarItem to="/user" icon={<PersonIcon />} primary="Profile" />
      <Button
        onClick={handleLogout}
        sx={{
          fontSize: '1.5rem',
          fontWeight: 700,
          backgroundColor: (t) =>
            t.palette.mode === 'light'
              ? t.palette.primary.main
              : t.palette.secondary.main,
          color: (t) =>
            t.palette.mode === 'light'
              ? t.palette.secondary.main
              : t.palette.primary.main,
        }}
      >
        <LogoutIcon sx={{ mr: '1.5rem', ml: '0.8rem' }} /> Logout
      </Button>
    </Grid>
  );
};

export default DashboardSidebar;
