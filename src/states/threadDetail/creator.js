import actions from '../actions';

const { threadDetail: ActionType } = actions;

export function getThreadDetailCreator(threadDetail) {
  return {
    type: ActionType.GET_THREAD_DETAIL,
    payload: { threadDetail },
  };
}

export function clearThreadDetailCreator() {
  return {
    type: ActionType.CLEAR_THREAD_DETAIL,
  };
}
