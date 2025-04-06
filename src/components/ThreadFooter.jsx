import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import Button from './Button';
import { postedAt } from '../utils';

const ThreadFooter = ({
  onUpVote,
  onDownVote,
  onNeutralVote,
  upVotesBy,
  downVotesBy,
  ownerId,
  createdAt,
  totalComments = 0,
  showCommentButton = true,
}) => {
  const authUser = useSelector((states) => states.authUser || null);
  const users = useSelector((states) => states.users || null);
  const user = users?.find((user) => user.id === ownerId) || null;
  const { avatar, name } = user || {};

  return (
    <div className="flex items-center justify-between">
      <div className="text-sm">
        <p>Posted: {postedAt(createdAt)}</p>
        <div className="flex items-center gap-1">
          By: {avatar && <img src={avatar} alt="avatar" className="w-6 h-6 rounded-full" />}
          <p>{name || ownerId} </p>
        </div>
      </div>
      <div className="flex items-center gap-1">
        {/* COMMENT */}
        {showCommentButton && (
          <Button.Normal as="div" iconName="typcn:arrow-back-outline" disabled>
            {totalComments}
          </Button.Normal>
        )}
        {/* LIKE */}
        {authUser && upVotesBy?.includes(authUser.id) ? (
          <Button.Dark iconName="iconamoon:like-thin" onClick={onNeutralVote}>
            {upVotesBy?.length}
          </Button.Dark>
        ) : (
          <Button.Normal iconName="iconamoon:like-thin" onClick={onUpVote}>
            {upVotesBy?.length}
          </Button.Normal>
        )}
        {/* DISLIKE */}
        {authUser && downVotesBy?.includes(authUser.id) ? (
          <Button.Dark iconName="iconamoon:dislike-thin" onClick={onNeutralVote}>
            {downVotesBy?.length}
          </Button.Dark>
        ) : (
          <Button.Normal iconName="iconamoon:dislike-thin" onClick={onDownVote}>
            {downVotesBy?.length}
          </Button.Normal>
        )}
      </div>
    </div>
  );
};
ThreadFooter.propTypes = {
  onUpVote: PropTypes.func.isRequired,
  onDownVote: PropTypes.func.isRequired,
  onNeutralVote: PropTypes.func.isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  ownerId: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  totalComments: PropTypes.number,
  showCommentButton: PropTypes.bool,
};
export default ThreadFooter;
