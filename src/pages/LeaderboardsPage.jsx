import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getLeaderboards } from '../states/leaderboards/action';
import { useSelector } from 'react-redux';
import Users from '../components/Users';
import { useLoading } from '../hooks/use-loading';
import LoadingTailwind from '../components/LoadingTailwind';

const LeaderboardsPage = () => {
  const users = useSelector((states) => states.leaderboards);

  const dispatch = useDispatch();
  const isLoading = useLoading();

  useEffect(() => {
    dispatch(getLeaderboards());
  }, [dispatch]);

  if (isLoading) {
    return <LoadingTailwind />;
  }

  return (
    <>
      <div className="container mx-auto pb-4">
        <h2 className="font-semibold text-2xl">Active Users</h2>
        <hr className="my-2" />
        {/* <pre>{JSON.stringify(users, null, 2)}</pre> */}
        {users.length > 0 && users.map((user) => <Users {...user} key={user.id} />)}
      </div>
    </>
  );
};
export default LeaderboardsPage;
