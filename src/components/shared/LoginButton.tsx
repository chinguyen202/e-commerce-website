import { Tooltip, IconButton } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

type Props = {
  name: string;
  handleClick: () => void;
};

const LoginButton = ({ name, handleClick }: Props) => {
  return (
    <Tooltip title={name}>
      <IconButton sx={{ p: 0, marginRight: '1rem' }} onClick={handleClick}>
        <AccountCircleIcon sx={{ fontSize: 40 }} color="secondary" />
      </IconButton>
    </Tooltip>
  );
};

export default LoginButton;
