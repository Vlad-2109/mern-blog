import { PrivateRouteProps } from '../types/types';
import { useAppSelector } from '../redux/hook';
import { Navigate } from 'react-router-dom';

export const OnlyAdminPrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { currentUser } = useAppSelector((state) => state.user);
  return currentUser?.isAdmin ? <>{children}</> : <Navigate to="/sign-in" />;
};
