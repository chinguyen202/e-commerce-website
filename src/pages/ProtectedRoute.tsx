import { Navigate } from 'react-router-dom';
import useAppSelector from '../hooks/useAppSelector';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const isAuth = useAppSelector((store) => store.user);
  if (!isAuth) {
    return <Navigate to="/" />;
  }
  return <>{children}</>;
};

export default ProtectedRoute;
