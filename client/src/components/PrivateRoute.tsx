import { PrivateRouteProps } from '../types/types';
import { useAppSelector } from '../redux/hook';
import { Navigate } from 'react-router-dom';

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { currentUser } = useAppSelector((state) => state.user);
  return currentUser ? <>{children}</> : <Navigate to="/sign-in" />;
};
