import actions from '../actions';

const { users: ActionType } = actions;

function usersReducer(users = [], action = {}) {
  switch (action.type) {
    case ActionType.GET_USERS:
      return action.payload.users;
    case ActionType.REGISTER_USERS:
      return null;
    default:
      return users;
  }
}

export default usersReducer;
