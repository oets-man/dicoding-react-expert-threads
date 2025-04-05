import { showLoading, hideLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';
import { setAuthUserCreator, unsetAuthUserCreator } from './creator';

function setAuthUser({ email, password }) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const token = await api.login({ email, password });
      api.putAccessToken(token);
      const authUser = await api.getOwnProfile();
      await dispatch(setAuthUserCreator(authUser));
      dispatch(hideLoading());
      return true;
    } catch (error) {
      alert(error.message);
      dispatch(hideLoading());
      return false;
    }
  };
}

function unsetAuthUser() {
  return (dispatch) => {
    dispatch(unsetAuthUserCreator());
    api.putAccessToken('');
  };
}

export { setAuthUser, unsetAuthUser };
