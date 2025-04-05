import { hideLoading } from 'react-redux-loading-bar';
import { showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';
import { clearThreadDetailCreator, getThreadDetailCreator } from './creator';

function getThreadDetail(threadId) {
  return async (dispatch) => {
    dispatch(showLoading());
    dispatch(clearThreadDetailCreator());

    try {
      const thread = await api.getThreadDetail(threadId);
      dispatch(getThreadDetailCreator(thread));
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

function clearThreadDetail() {
  return (dispatch) => {
    dispatch(clearThreadDetailCreator());
  };
}

export { getThreadDetail, clearThreadDetail };
