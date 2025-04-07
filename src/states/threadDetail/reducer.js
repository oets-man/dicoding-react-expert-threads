import actions from '../actions';

const { threadDetail: ActionType } = actions;

function threadDetailReducer(threadDetail = null, action = {}) {
  switch (action.type) {
    // thread
    case ActionType.GET_THREAD_DETAIL:
      return {
        ...action.payload.threadDetail,
        totalComments: action.payload.threadDetail.comments.length,
        ownerId: action.payload.threadDetail.owner.id,
        comments: action.payload.threadDetail.comments.map((comment) => ({
          ...comment,
          ownerId: comment.owner.id,
        })),
      };
    case ActionType.CLEAR_THREAD_DETAIL:
      return null;

    // vote thread
    case ActionType.UP_VOTE_DETAIL:
      return {
        ...threadDetail,
        downVotesBy: threadDetail.downVotesBy.filter((id) => id !== action.payload.userId),
        upVotesBy: [...threadDetail.upVotesBy, action.payload.userId],
      };
    case ActionType.DOWN_VOTE_DETAIL:
      return {
        ...threadDetail,
        upVotesBy: threadDetail.upVotesBy.filter((id) => id !== action.payload.userId),
        downVotesBy: [...threadDetail.downVotesBy, action.payload.userId],
      };
    case ActionType.NEUTRAL_VOTE_DETAIL:
      return {
        ...threadDetail,
        upVotesBy: threadDetail.upVotesBy.filter((id) => id !== action.payload.userId),
        downVotesBy: threadDetail.downVotesBy.filter((id) => id !== action.payload.userId),
      };
    case ActionType.RESTORE_VOTE_DETAIL:
      return {
        ...threadDetail,
        upVotesBy: action.payload.upVotesBy,
        downVotesBy: action.payload.downVotesBy,
      };

    // vote comment
    case ActionType.UP_VOTE_COMMENT:
      return {
        ...threadDetail,
        comments: threadDetail.comments.map((comment) => {
          if (comment.id === action.payload.commentId) {
            return {
              ...comment,
              downVotesBy: comment.downVotesBy.filter((id) => id !== action.payload.userId),
              upVotesBy: [...comment.upVotesBy, action.payload.userId],
            };
          }
          return comment;
        }),
      };
    case ActionType.DOWN_VOTE_COMMENT:
      return {
        ...threadDetail,
        comments: threadDetail.comments.map((comment) => {
          if (comment.id === action.payload.commentId) {
            return {
              ...comment,
              upVotesBy: comment.upVotesBy.filter((id) => id !== action.payload.userId),
              downVotesBy: [...comment.downVotesBy, action.payload.userId],
            };
          }
          return comment;
        }),
      };
    case ActionType.NEUTRAL_VOTE_COMMENT:
      return {
        ...threadDetail,
        comments: threadDetail.comments.map((comment) => {
          if (comment.id === action.payload.commentId) {
            return {
              ...comment,
              upVotesBy: comment.upVotesBy.filter((id) => id !== action.payload.userId),
              downVotesBy: comment.downVotesBy.filter((id) => id !== action.payload.userId),
            };
          }
          return comment;
        }),
      };
    case ActionType.RESTORE_VOTE_COMMENT:
      return {
        ...threadDetail,
        comments: threadDetail.comments.map((comment) => ({
          ...comment,
          upVotesBy: action.payload.upVotesBy,
          downVotesBy: action.payload.downVotesBy,
        })),
      };
    case ActionType.ADD_COMMENT:
      return {
        ...threadDetail,
        comments: [
          ...threadDetail.comments,
          {
            ...action.payload.comment,
            ownerId: action.payload.comment.owner.id,
          },
        ],
      };
    default:
      return threadDetail;
  }
}

export default threadDetailReducer;
