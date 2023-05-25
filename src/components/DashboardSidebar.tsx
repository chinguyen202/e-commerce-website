import { ListItemIcon, Grid } from '@mui/material';
import LayersIcon from '@mui/icons-material/Layers';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import CategoryIcon from '@mui/icons-material/Category';
import SidebarItem, {
  StyledListItemButton,
  StyledListItemText,
} from './SidebarItem';

import { useAppDispatch } from '../hooks/useAppDispatch';
import useAppSelector from '../hooks/useAppSelector';
import { logoutUser } from '../store/reducers/userSlice';

const DashboardSidebar = () => {
  const dispatch = useAppDispatch();
  const { currentUser } = useAppSelector((state) => state.user);

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
        <>
          <SidebarItem
            to="/user/stats"
            icon={<DashboardIcon />}
            primary="Dashboard"
          />
          <SidebarItem
            to="/customers"
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
        </>
      ) : (
        <></>
      )}
      <SidebarItem to="/user" icon={<PersonIcon />} primary="Profile" />
      <StyledListItemButton onClick={() => dispatch(logoutUser)}>
        <ListItemIcon>
          <LogoutIcon />
        </ListItemIcon>
        <StyledListItemText primary="Logout" />
      </StyledListItemButton>
    </Grid>
  );
};

export default DashboardSidebar;
