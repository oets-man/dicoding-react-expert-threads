import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';

const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-jingga-400">
        <div className="mx-auto text-center text-jingga-50">
          <p className="text-4xl font-bold ">Ups...</p>
          <h1 className="my-4 text-2xl font-light">Halaman tidak ditemukan!!!</h1>
          <div className="flex items-center justify-center mt-4">
            <Button.Normal onClick={() => navigate(-1)} iconName="typcn:arrow-back-outline">
              Kembali
            </Button.Normal>
          </div>
        </div>
      </div>
    </>
  );
};
export default ErrorPage;
