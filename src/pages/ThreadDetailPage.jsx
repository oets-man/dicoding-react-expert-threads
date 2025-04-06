import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import {
  clearThreadDetail,
  getThreadDetail,
  setDetailDownVote,
  setDetailNeutralVote,
  setDetailUpVote,
} from '../states/threadDetail/action';
import { useParams } from 'react-router-dom';
import LoadingTailwind from '../components/LoadingTailwind';
import parse from 'html-react-parser';
import ThreadFooter from '../components/ThreadFooter';
import CommentItem from '../components/CommentItem';
import NotFound from '../components/NotFound';
import CommentForm from '../components/CommentForm';
// import { useLoading } from '../hooks/use-loading';

const ThreadDetailPage = () => {
  // const isLoading = useLoading();

  const { id } = useParams();

  const threadDetail = useSelector((states) => states.threadDetail);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getThreadDetail(id));
    return () => {
      dispatch(clearThreadDetail());
    };
  }, [dispatch, id]);

  const onUpVote = () => dispatch(setDetailUpVote(id));
  const onDownVote = () => dispatch(setDetailDownVote(id));
  const onNeutralVote = () => dispatch(setDetailNeutralVote(id));

  // if (isLoading) {
  //   return <LoadingTailwind />;
  // }

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
        <ThreadFooter {...threadDetail} onUpVote={onUpVote} onDownVote={onDownVote} onNeutralVote={onNeutralVote} />
        <hr className="my-2" />

        {/* COMMENT FORM */}
        <CommentForm />

        {/* COMMENTS */}
        <h3 className="text-xl">Comments</h3>
        {threadDetail.comments?.length > 0 ? (
          threadDetail.comments.map((comment) => <CommentItem key={comment.id} {...comment} />)
        ) : (
          <NotFound>No comments available</NotFound>
        )}
      </div>
    </>
  ) : (
    <NotFound>No thread available</NotFound>
  );
};

export default ThreadDetailPage;
