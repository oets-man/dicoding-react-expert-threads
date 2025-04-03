import actions from '../actions';

const { threadDetail: ActionType } = actions;

function threadDetailReducer(threadDetail = null, action = {}) {
  switch (action.type) {
    case ActionType.GET_THREAD_DETAIL:
      return action.payload.threadDetail;
    case ActionType.CLEAR_THREAD_DETAIL:
      return null;
    default:
      return threadDetail;
  }
}

export default threadDetailReducer;
