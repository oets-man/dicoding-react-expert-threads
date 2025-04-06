import actions from '../actions';

const { leaderboards: ActionType } = actions;

function leaderboardsReducer(leaderboards = [], action = {}) {
  switch (action.type) {
    case ActionType.GET_LEADERBOARDS:
      return action.payload.leaderboards.leaderboards.map((leaderboard) => ({
        ...leaderboard.user,
        score: leaderboard.score,
      }));
    default:
      return leaderboards;
  }
}

export default leaderboardsReducer;
