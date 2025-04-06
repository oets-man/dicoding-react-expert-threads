import parse from 'html-react-parser';
import ThreadFooter from './ThreadFooter';
import { useDispatch } from 'react-redux';
import { setCommentDownVote, setCommentNeutralVote, setCommentUpVote } from '../states/threadDetail/action';

function CommentItem({ ...comment }) {
  const dispatch = useDispatch();
  const onUpVote = () => dispatch(setCommentUpVote(comment.id));
  const onDownVote = () => dispatch(setCommentDownVote(comment.id));
  const onNeutralVote = () => dispatch(setCommentNeutralVote(comment.id));
  return (
    <>
      <div className="border border-cyan-800 rounded p-2 mb-2">
        <div className="">{parse(comment.content)}</div>
        <hr className="my-2" />
        <ThreadFooter
          {...comment}
          showCommentButton={false}
          onDownVote={onDownVote}
          onNeutralVote={onNeutralVote}
          onUpVote={onUpVote}
        />
      </div>
      {/* <pre>{JSON.stringify(comment, null, 2)}</pre> */}
    </>
  );
}
export default CommentItem;
