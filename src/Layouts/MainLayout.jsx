import { Link, Outlet } from 'react-router-dom';
import Loading from '../components/Loading';
import { unsetAuthUser } from '../states/authUser/action';
import { useDispatch, useSelector } from 'react-redux';
import Navigation from '../components/Navigation';

export default function MainLayout() {
  const dispatch = useDispatch();
  const authUser = useSelector((states) => states.authUser || null);

  const logout = () => {
    const isConfirmed = confirm('Yakin ingin logout?');
    if (!isConfirmed) return;
    dispatch(unsetAuthUser());
  };

  return (
    <>
      <Loading />

      <header className="bg-slate-300 text-slate-800 dark:bg-slate-800 dark:text-slate-200">
        <div className="flex items-center justify-between">
          <Link to={'/'} className="px-4 py-2 ">
            <h1 className="text-xl font-medium ">Forum Diskusi</h1>
            <p className="italic text-sm">
              {authUser ? (
                <>
                  <span className="" style={{ fontVariant: 'small-caps' }}>
                    {authUser.name}
                  </span>{' '}
                  <span className="font-thin">({authUser.email})</span>
                </>
              ) : (
                <span className="text-red-600">Anda Belum Login</span>
              )}
            </p>
          </Link>
          <div className="px-4 py-2">
            <Navigation onLogout={logout} auth={!!authUser} />
          </div>
        </div>
        <hr />
      </header>
      <main className="p-4">
        <Outlet />
      </main>
      <footer className="fixed inset-x-0 bottom-0 w-full px-4 py-1 text-sm bg-gray-600 text-slate-100">
        <p className="m-0 text-center">
          <a href="https://github.com/idsantri" target="_blank">
            by oets
          </a>
        </p>
      </footer>
    </>
  );
}
