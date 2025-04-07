import PropTypes from 'prop-types';

function Users({ name, email, avatar, score, id }) {
  return (
    <>
      <div className="border rounded p-2 border-slate-300 my-2 bg-slate-50 hover:bg-blue-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start gap-x-2">
            <div>
              <img src={avatar} alt="avatar" className="w-16 h-16 rounded-full" />
            </div>
            <div>
              <p className="text-lg">{name}</p>
              <p className="text-sm">{email}</p>
              <p className="text-sm">{id}</p>
            </div>
          </div>
          <div className="text-center bg-slate-200 px-2 py-1 min-w-20 rounded">
            <div className="">Score</div>
            <div className="font-semibold text-2xl">{score}</div>
          </div>
        </div>
      </div>
    </>
  );
}
Users.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  avatar: PropTypes.string,
  id: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};
export default Users;
