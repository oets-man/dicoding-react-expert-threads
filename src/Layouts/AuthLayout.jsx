import { Navigate, Outlet } from 'react-router-dom';

export default function AuthLayout() {
  //   const { isAuthenticated } = useAuth();
  //   if (isAuthenticated) {
  //     return <Navigate to="/" replace />;
  //   }

  return (
    <div className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
      <div className="w-full overflow-hidden border rounded-md bg-slate-100 min-w-96 border-slate-300 dark:bg-slate-800">
        <header className=" text-slate-800 bg-slate-200">
          <h1 className="p-2 text-xl font-medium text-center">
            Aplikasi Catatan Pribadi
          </h1>
        </header>
        <main className="p-2">
          <Outlet />
        </main>
        <footer className="bg-slate-200 text-slate-600">
          <p className="p-1 text-center">
            <a href="https://github.com/idsantri" target="_blank">
              by oets
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}
