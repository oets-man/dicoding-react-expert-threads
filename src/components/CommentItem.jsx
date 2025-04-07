import parse from 'html-react-parser';
import ThreadFooter from './ThreadFooter';
import { useDispatch } from 'react-redux';
import { setCommentDownVote, setCommentNeutralVote, setCommentUpVote } from '../states/threadDetail/action';
import PropTypes from 'prop-types';

function CommentItem({ id, content, ...comment }) {
  const dispatch = useDispatch();
  const onUpVote = () => dispatch(setCommentUpVote(id));
  const onDownVote = () => dispatch(setCommentDownVote(id));
  const onNeutralVote = () => dispatch(setCommentNeutralVote(id));
  return (
    <>
      <div className="border border-cyan-800 rounded p-2 mb-2">
        <div className="">{parse(content)}</div>
        <hr className="my-2" />
        <ThreadFooter
          {...comment}
          showCommentButton={false}
          onDownVote={onDownVote}
          onNeutralVote={onNeutralVote}
          onUpVote={onUpVote}
        />
      </div>
    </>
  );
}
CommentItem.propTypes = {
  id: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};
export default CommentItem;
