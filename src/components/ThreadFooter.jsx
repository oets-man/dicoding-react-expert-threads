import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import Button from './Button';
import { postedAt } from '../utils';

const ThreadFooter = ({ id, owner, avatar, totalComments, onUpVote, onDownVote, onNeutralVote }) => {
  const authUser = useSelector((states) => states.authUser || null);
  const threads = useSelector((states) => states.threads || null);
  const thread = threads?.find((thread) => thread.id === id) || null;

  return (
    <div className="flex items-center justify-between">
      <div>
        <p>Posted: {postedAt(thread.createdAt)}</p>
        <div className="flex items-center gap-1">
          By: <img src={avatar} alt="avatar" className="w-6 h-6 rounded-full" />
          <p>{owner} </p>
        </div>
      </div>
      <div className="flex items-center gap-1">
        {/* LIKE */}
        {authUser && thread.upVotesBy?.includes(authUser.id) ? (
          <Button.Dark iconName="iconamoon:like-thin" onClick={onNeutralVote}>
            {thread.upVotesBy?.length}
          </Button.Dark>
        ) : (
          <Button.Normal iconName="iconamoon:like-thin" onClick={onUpVote}>
            {thread.upVotesBy?.length}
          </Button.Normal>
        )}
        {/* DISLIKE */}
        {authUser && thread.downVotesBy?.includes(authUser.id) ? (
          <Button.Dark iconName="iconamoon:dislike-thin" onClick={onNeutralVote}>
            {thread.downVotesBy?.length}
          </Button.Dark>
        ) : (
          <Button.Normal iconName="iconamoon:dislike-thin" onClick={onDownVote}>
            {thread.downVotesBy?.length}
          </Button.Normal>
        )}
        {/* COMMENT */}
        <Button.Normal as="div" iconName="typcn:arrow-back-outline" disabled>
          {totalComments}
        </Button.Normal>
      </div>
    </div>
  );
};

ThreadFooter.propTypes = {
  id: PropTypes.string.isRequired,
  owner: PropTypes.string.isRequired,
  avatar: PropTypes.string,
  totalComments: PropTypes.number.isRequired,
  onUpVote: PropTypes.func.isRequired,
  onDownVote: PropTypes.func.isRequired,
  onNeutralVote: PropTypes.func.isRequired,
};
export default ThreadFooter;
