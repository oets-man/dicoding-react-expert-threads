import actions from '../actions';

const { authUser: ActionType } = actions;

export function setAuthUserCreator(authUser) {
  return {
    type: ActionType.SET_AUTH_USER,
    payload: {
      authUser,
    },
  };
}

export function unsetAuthUserCreator() {
  return {
    type: ActionType.UNSET_AUTH_USER,
  };
}
