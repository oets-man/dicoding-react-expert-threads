import { showLoading, hideLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';
import actions from '../actions';
import { setAuthUserCreator } from '../authUser/creator';

const { isPreload: ActionType } = actions;

function preloadProcess() {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const authUser = await api.getOwnProfile();
      dispatch(setAuthUserCreator(authUser));
    } catch (error) {
      console.error('preload process error: ', error.message);
      dispatch(setAuthUserCreator(null));
    } finally {
      dispatch({
        type: ActionType.SET_IS_PRELOAD,
        payload: {
          isPreload: false,
        },
      });
    }
    dispatch(hideLoading());
  };
}

export { preloadProcess };
