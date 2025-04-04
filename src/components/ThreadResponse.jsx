import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import Button from './Button';
import { useDispatch } from 'react-redux';
import { setDownVote, setNeutralVote, setUpVote } from '../states/threads/action';

const ThreadResponse = ({ upVotesBy, downVotesBy, totalComments, threadId }) => {
  const dispatch = useDispatch();
  const authUser = useSelector((states) => states.authUser || null);
  const upVote = () => {
    dispatch(setUpVote(threadId));
  };
  const downVote = () => {
    dispatch(setDownVote(threadId));
  };
  const neutralVote = () => {
    dispatch(setNeutralVote(threadId));
  };
  return (
    <div className="flex items-center gap-1">
      {/* LIKE */}
      {authUser && upVotesBy.includes(authUser.id) ? (
        <Button.Dark iconName="iconamoon:like-thin" onClick={neutralVote}>
          {upVotesBy.length}
        </Button.Dark>
      ) : (
        <Button.Normal iconName="iconamoon:like-thin" onClick={upVote}>
          {upVotesBy.length}
        </Button.Normal>
      )}
      {/* DISLIKE */}
      {authUser && downVotesBy.includes(authUser.id) ? (
        <Button.Dark iconName="iconamoon:dislike-thin" onClick={neutralVote}>
          {downVotesBy.length}
        </Button.Dark>
      ) : (
        <Button.Normal iconName="iconamoon:dislike-thin" onClick={downVote}>
          {downVotesBy.length}
        </Button.Normal>
      )}
      {/* COMMENT */}
      <Button.Normal as="div" iconName="typcn:arrow-back-outline" disabled>
        {totalComments}
      </Button.Normal>
    </div>
  );
};

ThreadResponse.propTypes = {
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  totalComments: PropTypes.number.isRequired,
  threadId: PropTypes.string.isRequired,
};
export default ThreadResponse;
