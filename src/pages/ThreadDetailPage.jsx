import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { clearThreadDetail, getThreadDetail } from '../states/threadDetail/action';
import { useParams } from 'react-router-dom';
import LoadingTailwind from '../components/LoadingTailwind';
import parse from 'html-react-parser';
import ThreadFooter from '../components/ThreadFooter';

const ThreadDetailPage = () => {
  const loadingBar = useSelector((states) => states.loadingBar);
  const isLoading = loadingBar?.default ?? true;
  const { id } = useParams();

  const threadDetail = useSelector((states) => states.threadDetail);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getThreadDetail(id));
    return () => {
      dispatch(clearThreadDetail());
    };
  }, [dispatch, id]);

  if (isLoading) {
    return <LoadingTailwind />;
  }

  return threadDetail ? (
    <>
      <div className="container mx-auto">
        <div className="flex items-center gap-x-4">
          <h1 className="text-3xl">Thread</h1>
          <p className="border-blue-600 border rounded px-2 py-1">#{threadDetail?.category}</p>
        </div>
        <hr className="my-2" />
        <h2 className="text-2xl">{threadDetail.title}</h2>
        <div>{parse(threadDetail.body)}</div>
        <hr className="my-2" />
        <ThreadFooter
          id={threadDetail.id}
          owner={threadDetail.owner.name}
          avatar={threadDetail.owner.avatar}
          totalComments={threadDetail.comments.length}
        />
        <hr className="my-2" />
      </div>
      <pre>{JSON.stringify(threadDetail, null, 2)}</pre>
    </>
  ) : (
    <p className="text-lg text-center">No threads available</p>
  );
};

export default ThreadDetailPage;
