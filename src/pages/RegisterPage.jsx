import { Link } from 'react-router-dom';
import InputField from '../components/InputField';
import useInput from '../hooks/use-input';
import { ButtonNormal } from '../components/Button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../states/users/action';
import { useLoading } from '../hooks/use-loading';

function RegisterPage() {
  const isLoading = useLoading();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, onNameChange] = useInput('');
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');
  const [confirmPassword, onConfirmPasswordChange] = useInput('');

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Password dan konfirmasi password tidak sesuai');
      document.getElementById('password').focus();
      return;
    }
    dispatch(registerUser({ email, name, password })).then((result) => {
      if (result) {
        alert('Registrasi sukses. Sekarang Anda bisa login');
        navigate('/login', { replace: true });
      }
    });
  };

  return (
    <>
      <h2 className="p-2 text-xl text-center text-slate-800 dark:text-slate-200">Registrasi</h2>
      <form onSubmit={onSubmit}>
        <InputField
          label="Nama Lengkap"
          name="name"
          placeholder="Masukkan nama Anda"
          type="text"
          value={name}
          onChange={onNameChange}
          id="name"
          required
        />
        <InputField
          label="Email"
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
        <InputField
          label="Konfirmasi Kata Sandi"
          name="confirm-password"
          placeholder="Ulangi kata sandi"
          type="password"
          value={confirmPassword}
          onChange={onConfirmPasswordChange}
          id="confirm-password"
          required
        />
        <div className="flex justify-between items-center">
          <ButtonNormal type="submit" disabled={isLoading}>
            {isLoading ? 'Memproses...' : 'Daftar'}
          </ButtonNormal>
          <p className="p-2 text-sm text-slate-950 dark:text-slate-200">
            Sudah punya akun?{' '}
            <Link to={'/login'} className="underline">
              Masuk
            </Link>
          </p>
        </div>
      </form>
    </>
  );
}

export default RegisterPage;
