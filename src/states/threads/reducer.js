import actions from '../actions';

const { threads: ActionType } = actions;

function threadsReducer(threads = [], action = {}) {
  switch (action.type) {
    case ActionType.GET_THREADS:
      return action.payload.threads;
    case ActionType.ADD_THREAD:
      return [action.payload.thread, ...threads];
    case ActionType.UP_VOTE:
      return threads.map((thread) => {
        if (thread.id === action.payload.threadId) {
          return {
            ...thread,
            downVotesBy: thread.downVotesBy.filter((id) => id !== action.payload.userId),
            upVotesBy: [...thread.upVotesBy, action.payload.userId],
          };
        }
        return thread;
      });
    case ActionType.DOWN_VOTE:
      return threads.map((thread) => {
        if (thread.id === action.payload.threadId) {
          return {
            ...thread,
            upVotesBy: thread.upVotesBy.filter((id) => id !== action.payload.userId),
            downVotesBy: [...thread.downVotesBy, action.payload.userId],
          };
        }
        return thread;
      });
    case ActionType.NEUTRAL_VOTE:
      return threads.map((thread) => {
        if (thread.id === action.payload.threadId) {
          return {
            ...thread,
            upVotesBy: thread.upVotesBy.filter((id) => id !== action.payload.userId),
            downVotesBy: thread.downVotesBy.filter((id) => id !== action.payload.userId),
          };
        }
        return thread;
      });
    case ActionType.RESTORE_THREAD_VOTES:
      return threads.map((thread) => {
        if (thread.id === action.payload.threadId) {
          return {
            ...thread,
            upVotesBy: action.payload.upVotesBy,
            downVotesBy: action.payload.downVotesBy,
          };
        }
        return thread;
      });
    default:
      return threads;
  }
}

export default threadsReducer;
