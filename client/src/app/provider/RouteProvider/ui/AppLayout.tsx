import { getAuthToken } from '@/entities/User';
import { LOCAL_STORAGE_TOKEN } from '@/shared/consts/localStorage';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const AppLayout = () => {
  const isLogged = useSelector(getAuthToken);
  const token = localStorage.getItem(LOCAL_STORAGE_TOKEN);

  if (!token && !isLogged) {
    return <Navigate to="/login" />;
  }

  return <Outlet/>;
};

export default AppLayout;
