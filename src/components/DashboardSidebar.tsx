import {
  styled,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Grid,
} from '@mui/material';
import LayersIcon from '@mui/icons-material/Layers';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import CategoryIcon from '@mui/icons-material/Category';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';

const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
  color:
    theme.palette.mode === 'light'
      ? theme.palette.secondary.main
      : theme.palette.primary.main,
}));

const StyledListItemText = styled(ListItemText)(({ theme }) => ({
  '& .MuiTypography-root': {
    fontSize: '1.5rem',
    fontWeight: '600',
  },
}));

const DashboardSidebar = () => {
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
      <StyledListItemButton>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <StyledListItemText primary="Dashboard" />
      </StyledListItemButton>
      <StyledListItemButton>
        <ListItemIcon>
          <PeopleAltIcon />
        </ListItemIcon>
        <StyledListItemText primary="Customers" />
      </StyledListItemButton>
      <StyledListItemButton>
        <ListItemIcon>
          <CategoryIcon />
        </ListItemIcon>
        <StyledListItemText primary="Add Category" />
      </StyledListItemButton>
      <StyledListItemButton>
        <ListItemIcon>
          <LayersIcon />
        </ListItemIcon>
        <StyledListItemText primary="Add Product" />
      </StyledListItemButton>
      <StyledListItemButton>
        <ListItemIcon>
          <PersonIcon />
        </ListItemIcon>
        <StyledListItemText primary="Profile" />
      </StyledListItemButton>
      <StyledListItemButton>
        <ListItemIcon>
          <LogoutIcon />
        </ListItemIcon>
        <StyledListItemText primary="Logout" />
      </StyledListItemButton>
    </Grid>
  );
};

export default DashboardSidebar;
