import { showLoading, hideLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';
import actions from '../actions';

const { leaderboards: ActionType } = actions;

function getLeaderboards() {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const leaderboards = await api.getLeaderboards();
      dispatch({
        type: ActionType.GET_LEADERBOARDS,
        payload: { leaderboards },
      });
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

export { getLeaderboards };
