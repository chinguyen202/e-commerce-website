import { Navigate } from 'react-router-dom';
import useAppSelector from '../hooks/useAppSelector';

interface ProtectedRouteProps {
  children: React.ReactNode;
  isAuth: boolean;
}

const ProtectedRoute = ({ isAuth, children }: ProtectedRouteProps) => {
  if (!isAuth) {
    return <Navigate to="/" />;
  }
  return <>{children}</>;
};

export default ProtectedRoute;
