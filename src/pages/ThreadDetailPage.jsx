import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getThreadDetail } from '../states/threadDetail/action';
import { useParams } from 'react-router-dom';

const ThreadDetailPage = () => {
  const { id } = useParams();

  const threadDetail = useSelector((states) => states.threadDetail);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getThreadDetail(id));
  }, [dispatch, id]);

  return (
    <div className="home-page">
      <h1>Welcome to the Home Page</h1>
      <pre>{JSON.stringify(threadDetail, null, 2)}</pre>
    </div>
  );
};

export default ThreadDetailPage;
