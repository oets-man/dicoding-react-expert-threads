import { showLoading, hideLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';
import actions from '../actions';

const { users: ActionType } = actions;

function registerUsersActionCreator() {
  return {
    type: ActionType.REGISTER_USERS,
  };
}

function registerUser({ email, name, password }) {
  return async (dispatch) => {
    dispatch(showLoading());
    dispatch(registerUsersActionCreator());
    try {
      await api.register({ email, name, password });
      dispatch(hideLoading());
      return true;
    } catch (error) {
      alert(error.message);
      dispatch(hideLoading());
      return false;
    }
  };
}

function getUsersActionCreator(users) {
  return {
    type: ActionType.GET_USERS,
    payload: {
      users,
    },
  };
}

function getUsers() {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const users = await api.getAllUsers();

      dispatch(getUsersActionCreator(users));
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}
export { registerUser, getUsers };
