import { showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';
import { hideLoading } from 'react-redux-loading-bar';
import actions from '../actions';

const { threads: ActionType } = actions;

function getThreadsActionCreator(threads) {
  return {
    type: ActionType.GET_THREADS,
    payload: { threads },
  };
}

function getThreads() {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const threads = await api.getAllThreads();
      dispatch(getThreadsActionCreator(threads));
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

function addThreadActionCreator(thread) {
  return {
    type: ActionType.ADD_THREAD,
    payload: { thread },
  };
}

function addThread({ title, body, category = '' }) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const thread = await api.createThread({ title, body, category });
      dispatch(addThreadActionCreator(thread));
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

export { addThread, getThreads };
