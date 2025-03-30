import { Route, Routes } from 'react-router-dom';
import Loading from './components/Loading';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import MainLayout from './Layouts/MainLayout';
import AuthLayout from './Layouts/AuthLayout';

const App = () => {
  const authUser = null;
  if (authUser === null) {
    return (
      <>
        <Loading />
        <main>
          <Routes>
            <Route element={<AuthLayout />}>
              <Route path="/*" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
            </Route>
          </Routes>
        </main>
      </>
    );
  }

  return (
    <>
      <Loading />
      <div className="app-container">
        <header>
          <Navigation />
        </header>
        <main>
          <Routes>
            <Route element={<MainLayout />}>
              <Route path="/" element={<HomePage />} />
            </Route>
          </Routes>
        </main>
      </div>
    </>
  );
};

export default App;
