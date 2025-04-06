import actions from '../actions';

const { threads: ActionType } = actions;

export function getThreadsCreator(threads) {
  return {
    type: ActionType.GET_THREADS,
    payload: { threads },
  };
}

export function addThreadCreator(thread) {
  return {
    type: ActionType.ADD_THREAD,
    payload: { thread },
  };
}

export function restoreVoteCreator({ threadId, upVotesBy, downVotesBy }) {
  return {
    type: ActionType.RESTORE_VOTE,
    payload: { threadId, upVotesBy, downVotesBy },
  };
}
export function upVoteCreator(threadId, userId) {
  return {
    type: ActionType.UP_VOTE,
    payload: { threadId, userId },
  };
}

export function downVoteCreator(threadId, userId) {
  return {
    type: ActionType.DOWN_VOTE,
    payload: { threadId, userId },
  };
}

export function neutralVoteCreator(threadId, userId) {
  return {
    type: ActionType.NEUTRAL_VOTE,
    payload: { threadId, userId },
  };
}
