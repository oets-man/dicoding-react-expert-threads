import { Route, Routes } from 'react-router-dom';
import ThreadsPage from './pages/ThreadsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import MainLayout from './Layouts/MainLayout';
import AuthLayout from './Layouts/AuthLayout';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { preloadProcess } from './states/isPreload/action';
import Loading from './components/Loading';
import ErrorPage from './pages/ErrorPage';
import ThreadDetailPage from './pages/ThreadDetailPage';
import { getUsers } from './states/users/action';
import LoadingTailwind from './components/LoadingTailwind';

const App = () => {
  const isPreload = useSelector((states) => states.isPreload || false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(preloadProcess());
    dispatch(getUsers());
  }, [dispatch]);

  if (isPreload) {
    return <LoadingTailwind>Tunggu sebentar. Aplikasi sedang disiapkan …</LoadingTailwind>;
  }

  return (
    <>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>
        <Route element={<MainLayout />}>
          <Route path="/" element={<ThreadsPage />} />
          <Route path="/threads" element={<ThreadsPage />} />
          <Route path="/threads/:id" element={<ThreadDetailPage />} />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
};

export default App;
