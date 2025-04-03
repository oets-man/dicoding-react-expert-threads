import { hideLoading } from 'react-redux-loading-bar';
import actions from '../actions';
import { showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';

const { threadDetail: ActionType } = actions;

function getThreadDetailActionCreator(threadDetail) {
  return {
    type: ActionType.GET_THREAD_DETAIL,
    payload: { threadDetail },
  };
}
function clearThreadDetailActionCreator() {
  return {
    type: ActionType.CLEAR_THREAD_DETAIL,
  };
}

function getThreadDetail(threadId) {
  return async (dispatch) => {
    dispatch(showLoading());
    dispatch(clearThreadDetailActionCreator());

    try {
      const thread = await api.getThreadDetail(threadId);
      dispatch(getThreadDetailActionCreator(thread));
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}
export { getThreadDetail };
