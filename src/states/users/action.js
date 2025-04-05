import { showLoading, hideLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';
import actions from '../actions';

const { users: ActionType } = actions;

function registerUser({ email, name, password }) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      await api.register({ email, name, password });
      dispatch({
        type: ActionType.REGISTER_USERS,
      });
      dispatch(hideLoading());
      return true;
    } catch (error) {
      dispatch(hideLoading());
      alert(error.message);
      return false;
    }
  };
}

function getUsers() {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const users = await api.getAllUsers();
      dispatch({
        type: ActionType.GET_USERS,
        payload: {
          users,
        },
      });
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

export { registerUser, getUsers };
