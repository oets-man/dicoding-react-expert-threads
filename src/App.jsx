import { Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import MainLayout from './Layouts/MainLayout';
import AuthLayout from './Layouts/AuthLayout';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { preloadProcess } from './states/isPreload/action';
import Loading from './components/Loading';

const App = () => {
  const authUser = useSelector((states) => states.authUser || null);
  const isPreload = useSelector((states) => states.isPreload || false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(preloadProcess());
  }, [dispatch]);

  if (isPreload) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-full border rounded-md bg-slate-100 min-w-96 border-slate-300 dark:bg-slate-800 mx-6">
          <Loading />
          <p className="text-center p-8 text-slate-800 dark:text-slate-200 text-3xl">Tunggu sebentar ...</p>
        </div>
      </div>
    );
  }

  if (authUser === null) {
    return (
      <>
        <Routes>
          <Route element={<AuthLayout />}>
            <Route path="/*" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Route>
        </Routes>
      </>
    );
  }

  return (
    <>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
