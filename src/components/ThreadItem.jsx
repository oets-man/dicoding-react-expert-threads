import PropTypes from 'prop-types';
import parse from 'html-react-parser';
import { postedAt } from '../utils';
import { Link } from 'react-router-dom';
import ThreadResponse from './ThreadResponse';
function ThreadItem({ category, id, title, body, createdAt, ownerId, upVotesBy, downVotesBy, totalComments }) {
  return (
    <div className="border border-gray-300 py-2 px-2 my-2 rounded">
      <p className="text-blue-600 py-1 px-2 border rounded border-blue-600 inline-block">#{category}</p>
      <h2 className="text-2xl font-medium text-blue-600 py-2">
        <Link to={`/threads/${id}`}>{title}</Link>
      </h2>
      {parse(body)}
      <hr className="mt-4 border-blue-500" />
      <div className="flex items-center justify-between">
        <p>Posted: {postedAt(createdAt)}</p>
        <p>By: {ownerId}</p>
      </div>
      <div className="flex items-center gap-x-4">
        <ThreadResponse
          iconName="iconamoon:like-thin"
          count={upVotesBy.length}
          onClick={() => {
            console.log('upvote');
          }}
        />
        <ThreadResponse iconName="iconamoon:dislike-thin" count={downVotesBy.length} />
        <ThreadResponse as="div" iconName="typcn:arrow-back-outline" count={totalComments} />
      </div>
    </div>
  );
}

ThreadItem.propTypes = {
  category: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  ownerId: PropTypes.string.isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  totalComments: PropTypes.number.isRequired,
};
export default ThreadItem;
