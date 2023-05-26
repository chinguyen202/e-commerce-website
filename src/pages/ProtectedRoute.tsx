import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
  isAuth: boolean;
}

const ProtectedRoute = ({ children, isAuth }: ProtectedRouteProps) => {
  if (!isAuth) {
    console.log('IS AUTH', isAuth);
    return <Navigate to="/" />;
  }
  return <>{children}</>;
};

export default ProtectedRoute;
