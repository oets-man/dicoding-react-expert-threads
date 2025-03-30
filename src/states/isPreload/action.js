import { showLoading, hideLoading } from 'react-redux-loading-bar';
import { setAuthUserActionCreator } from '../authUser/action';
import api from '../../utils/api';
import actions from '../actions';

const { isPreload: ActionType } = actions;

function setIsPreloadActionCreator(isPreload) {
  return {
    type: ActionType.SET_IS_PRELOAD,
    payload: {
      isPreload,
    },
  };
}

function preloadProcess() {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const authUser = await api.getOwnProfile();
      dispatch(setAuthUserActionCreator(authUser));
    } catch (error) {
      console.error('preload process error: ', error.message);
      dispatch(setAuthUserActionCreator(null));
    } finally {
      dispatch(setIsPreloadActionCreator(false));
    }
    dispatch(hideLoading());
  };
}

export { preloadProcess };
