import { useState } from 'react';
import InputField from '../components/InputField';
import Button from '../components/Button';
import InputWYSIWYG from '../components/InputWYSIWYG';
import { useDispatch } from 'react-redux';
import { addThread } from '../states/threads/action';
import { Link, useNavigate } from 'react-router-dom';
import { useLoading } from '../hooks/use-loading';
import { useSelector } from 'react-redux';

const ThreadNewPage = () => {
  const authUser = useSelector((states) => states.authUser || null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useLoading();

  const initInput = {
    category: '',
    title: '',
    body: '',
  };
  const [thread, setThread] = useState(initInput);

  const onSubmit = (e) => {
    e.preventDefault();
    if (thread.title === '' || thread.body === '') {
      alert('Title and body are required!');
      return;
    }
    dispatch(addThread(thread)).then((result) => {
      if (result) {
        alert('Thread created successfully!');
        navigate(`/threads/${result.id}`, { replace: true });
      }
    });
  };

  if (!authUser) {
    return (
      <div className="flex mx-auto items-center justify-center p-8 border border-red-800 rounded bg-red-50">
        <div className="text-red-900 text-xl">
          <p className="text-center">Anda Perlu login untuk membuat thread baru!</p>
          <p className="text-center text-blue-800">
            <Link to={'/login'}>ke halaman login?</Link>
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="container mx-auto">
        <h1 className="text-2xl p-2">Create New Thread</h1>
        <div className="border border-slate-400 rounded ">
          <form onSubmit={onSubmit}>
            <InputField
              label="Category"
              name="category"
              id="category"
              placeholder="thread category (optional)"
              value={thread.category}
              onChange={(e) => {
                setThread({ ...thread, category: e.target.value });
              }}
              disabled={isLoading}
            />
            <InputField
              required
              label="Title *"
              name="title"
              id="title"
              placeholder="thread title"
              value={thread.title}
              onChange={(e) => {
                setThread({ ...thread, title: e.target.value });
              }}
              disabled={isLoading}
            />
            <div className="p-2">
              <InputWYSIWYG
                value={thread.body}
                onChange={(e) => setThread({ ...thread, body: e.target.value })}
                disabled={isLoading}
              />
            </div>

            <div className="flex p-2 bg-slate-300 dark:bg-slate-700 items-center justify-between">
              <Button.Danger iconName="carbon:reset" type="reset" onClick={() => setThread(initInput)}>
                Reset
              </Button.Danger>
              <Button.Normal iconName="material-symbols-light:save-outline" type="submit" disabled={isLoading}>
                {isLoading ? 'Menyimpan...' : 'Simpan'}
              </Button.Normal>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ThreadNewPage;
