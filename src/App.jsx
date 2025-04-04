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

const App = () => {
  const isPreload = useSelector((states) => states.isPreload || false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(preloadProcess());
    dispatch(getUsers());
  }, [dispatch]);

  if (isPreload) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-full border rounded-md bg-slate-100 min-w-96 border-slate-300 dark:bg-slate-800">
          <Loading />
          <p className="text-center p-8 text-slate-800 dark:text-slate-200 text-3xl">Tunggu sebentar ...</p>
        </div>
      </div>
    );
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
