import { Link, useNavigate } from 'react-router-dom';
import InputField from '../components/InputField';
import useInput from '../hooks/use-input';
import { ButtonNormal } from '../components/Button';
import { useDispatch } from 'react-redux';
import { setAuthUser } from '../states/authUser/action';
import { useLoading } from '../hooks/use-loading';

function LoginPage() {
  const isLoading = useLoading();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(setAuthUser({ email, password })).then((result) => {
      result && navigate('/', { replace: true });
    });
  };

  return (
    <>
      <h2 className="p-2 text-xl text-center text-slate-800 dark:text-slate-200">Login</h2>
      <form onSubmit={onSubmit}>
        <InputField
          label="Pengguna"
          name="email"
          placeholder="Masukkan email Anda"
          type="email"
          value={email}
          onChange={onEmailChange}
          id="email"
          required
        />
        <InputField
          label="Kata Sandi"
          name="password"
          placeholder="Masukkan kata sandi Anda"
          type="password"
          value={password}
          onChange={onPasswordChange}
          id="password"
          required
        />
        <div className="flex items-center justify-between">
          <ButtonNormal type="submit" disabled={isLoading}>
            {isLoading ? 'Memproses...' : 'Masuk'}
          </ButtonNormal>
          <p className="p-2 text-sm text-slate-900 dark:text-slate-200">
            Belum punya akun?{' '}
            <Link to={'/register'} className="underline">
              Daftar
            </Link>
          </p>
        </div>
      </form>
    </>
  );
}

export default LoginPage;
