import { getAuthToken, getFetchAuthUser } from '@/entities/User';
import { LOCAL_STORAGE_TOKEN } from '@/shared/consts/localStorage';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { Suspense, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navbar, PageLoader } from '../widgets/index';
import { RouteProvider } from './provider';

const App = () => {
  const isLogged = useSelector(getAuthToken);
  const dispatch = useAppDispatch();

  const token = localStorage.getItem(LOCAL_STORAGE_TOKEN);

  useEffect(() => {
    if (token) {
      dispatch(getFetchAuthUser());
    }
  }, [dispatch]);

  return (
    <div className="app">
      <Suspense fallback="">
        {isLogged && <Navbar />}
        <PageLoader />
        <div className="container">
          <RouteProvider />
        </div>
      </Suspense>
    </div>
  );
};

export default App;
