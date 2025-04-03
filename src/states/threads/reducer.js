import actions from '../actions';

const { threads: ActionType } = actions;

function threadsReducer(threads = [], action = {}) {
  switch (action.type) {
    case ActionType.GET_THREADS:
      return action.payload.threads;
    case ActionType.ADD_THREAD:
      return [action.payload.thread, ...threads];
    default:
      return threads;
  }
}

export default threadsReducer;
