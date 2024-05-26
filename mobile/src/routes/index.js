import AuthRoutes from "./auth_routes";
import AppRoutes from './app_routes';
import { useContext } from 'react';
import { AuthContext } from '../contexts/authContext';

const Routes = () => {
  const { logged } = useContext(AuthContext);
  return logged ? <AppRoutes/> : <AuthRoutes />;
};

export default Routes;