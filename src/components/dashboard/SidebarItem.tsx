import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import {
  styled,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Theme,
} from '@mui/material';

type Props = {
  theme: Theme;
};

export const StyledListItemButton = styled(ListItemButton)(
  ({ theme }: Props) => ({
    color:
      theme.palette.mode === 'light'
        ? theme.palette.secondary.main
        : theme.palette.primary.main,
  })
);

export const StyledListItemText = styled(ListItemText)(() => ({
  '& .MuiTypography-root': {
    fontSize: '1.5rem',
    fontWeight: '600',
  },
}));

interface SidebarItemProps {
  to: string;
  icon: ReactNode;
  primary: string;
}

const SidebarItem = ({ to, icon, primary }: SidebarItemProps) => {
  return (
    <Link to={to} style={{ textDecoration: 'none' }}>
      <StyledListItemButton>
        <ListItemIcon>{icon}</ListItemIcon>
        <StyledListItemText primary={primary} />
      </StyledListItemButton>
    </Link>
  );
};

export default SidebarItem;
