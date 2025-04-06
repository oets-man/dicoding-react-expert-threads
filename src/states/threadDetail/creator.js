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

export function restoreVoteDetailCreator({ upVotesBy, downVotesBy }) {
  return {
    type: ActionType.RESTORE_VOTE_DETAIL,
    payload: { upVotesBy, downVotesBy },
  };
}

export function upVoteDetailCreator(userId) {
  return {
    type: ActionType.UP_VOTE_DETAIL,
    payload: { userId },
  };
}

export function downVoteDetailCreator(userId) {
  return {
    type: ActionType.DOWN_VOTE_DETAIL,
    payload: { userId },
  };
}

export function neutralVoteDetailCreator(userId) {
  return {
    type: ActionType.NEUTRAL_VOTE_DETAIL,
    payload: { userId },
  };
}

export function restoreVoteCommentCreator({ commentId, upVotesBy, downVotesBy }) {
  return {
    type: ActionType.RESTORE_VOTE_COMMENT,
    payload: { commentId, upVotesBy, downVotesBy },
  };
}

export function upVoteCommentCreator(commentId, userId) {
  return {
    type: ActionType.UP_VOTE_COMMENT,
    payload: { userId, commentId },
  };
}

export function downVoteCommentCreator(commentId, userId) {
  return {
    type: ActionType.DOWN_VOTE_COMMENT,
    payload: { userId, commentId },
  };
}

export function neutralVoteCommentCreator(commentId, userId) {
  return {
    type: ActionType.NEUTRAL_VOTE_COMMENT,
    payload: { userId, commentId },
  };
}
