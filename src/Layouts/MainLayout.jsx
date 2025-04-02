import { Link, Navigate, Outlet } from 'react-router-dom';
import Loading from '../components/Loading';
import { ButtonNormal } from '../components/Buttons';
import { unsetAuthUser } from '../states/authUser/action';
import { useDispatch } from 'react-redux';

export default function MainLayout() {
  const dispatch = useDispatch();

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
          <Link to={'/'} className="p-4 ">
            {/* <h1 className='text-xl font-medium '>{label.personalNote}</h1>
						<p className='font-thin' style={{ fontVariant: 'small-caps' }}>
							{user.name}
						</p> */}
          </Link>
          <div className="flex items-center">
            <nav className="">
              <ul className="flex items-center">
                {/* <NavigationLink to={'/'}>{label.active}</NavigationLink>
								<NavigationLink to={'/archive'}>{label.archive}</NavigationLink> */}
              </ul>
            </nav>
            <div className="px-2 py-1.5 m-2 border rounded-md border-slate-400">
              {/* <SwitchField
								label={label.darkMode}
								checked={theme == 'light' ? false : true}
								onChange={toggleTheme}
							/> */}
            </div>
            {/* <ButtonNormal onClick={toggleLocale} iconName='ion:language-outline'>
							{locale.toUpperCase()}
						</ButtonNormal>
						<ButtonNormal onClick={() => navigate('/add')} iconName='material-symbols:note-add'>
							{label.addNote}
						</ButtonNormal>
            */}
            <ButtonNormal onClick={logout} iconName="material-symbols:logout">
              Keluar
            </ButtonNormal>
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
