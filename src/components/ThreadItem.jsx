import PropTypes from 'prop-types';
import parse from 'html-react-parser';
import { Link } from 'react-router-dom';
import ThreadFooter from './ThreadFooter';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setDownVote, setNeutralVote, setUpVote } from '../states/threads/action';

function ThreadItem({ id }) {
  const threads = useSelector((states) => states.threads || null);
  const thread = threads?.find((thread) => thread.id === id) || null;
  const users = useSelector((states) => states.users || null);
  const user = users?.find((user) => user.id === thread.ownerId) || null;

  const dispatch = useDispatch();
  const onUpVote = () => dispatch(setUpVote(id));
  const onDownVote = () => dispatch(setDownVote(id));
  const onNeutralVote = () => dispatch(setNeutralVote(id));

  return (
    <div className="border border-gray-300 py-2 px-2 my-2 rounded">
      <p className="text-blue-600 py-1 px-2 border rounded border-blue-600 inline-block">#{thread.category}</p>
      <h2 className="text-2xl font-medium text-blue-600 py-2">
        <Link to={`/threads/${id}`}>{thread.title}</Link>
      </h2>
      <div>{parse(thread.body)}</div>
      <hr className="mt-4 border-blue-500" />
      <ThreadFooter
        id={thread.id}
        owner={user?.name || thread.ownerId}
        avatar={user?.avatar}
        totalComments={thread.totalComments}
        onUpVote={onUpVote}
        onDownVote={onDownVote}
        onNeutralVote={onNeutralVote}
      />
    </div>
  );
}

ThreadItem.propTypes = {
  id: PropTypes.string.isRequired,
};
export default ThreadItem;
