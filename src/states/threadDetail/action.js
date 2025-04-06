import { hideLoading } from 'react-redux-loading-bar';
import { showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';
import {
  addCommentCreator,
  clearThreadDetailCreator,
  downVoteCommentCreator,
  downVoteDetailCreator,
  getThreadDetailCreator,
  neutralVoteCommentCreator,
  neutralVoteDetailCreator,
  restoreVoteCommentCreator,
  restoreVoteDetailCreator,
  upVoteCommentCreator,
  upVoteDetailCreator,
} from './creator';

function getThreadDetail(threadId) {
  return async (dispatch) => {
    dispatch(showLoading());
    dispatch(clearThreadDetailCreator());

    try {
      const thread = await api.getThreadDetail(threadId);
      dispatch(getThreadDetailCreator(thread));
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

function clearThreadDetail() {
  return (dispatch) => {
    dispatch(clearThreadDetailCreator());
  };
}

/**
 * VOTE THREAD DETAIL
 */
function cloneDetailVotes() {
  return function (getState) {
    const thread = getState().threadDetail;
    const upVotesBy = [...thread.upVotesBy];
    const downVotesBy = [...thread.downVotesBy];
    return [upVotesBy, downVotesBy];
  };
}

function performVoteDetail(threadId, actionType) {
  return async function (dispatch, getState) {
    const authUser = getState().authUser;
    const [upVotesBy, downVotesBy] = cloneDetailVotes()(getState);

    try {
      if (!authUser || !authUser.id) {
        throw new Error('Anda perlu login!');
      }
      switch (actionType) {
        case 'upvote':
          dispatch(upVoteDetailCreator(authUser.id));
          await api.setUpVote(threadId);
          break;
        case 'downvote':
          dispatch(downVoteDetailCreator(authUser.id));
          await api.setDownVote(threadId);
          break;
        case 'neutral':
          dispatch(neutralVoteDetailCreator(authUser.id));
          await api.setNeutralVote(threadId);
          break;
        default:
          throw new Error('Tipe aksi tidak valid');
      }
    } catch (error) {
      dispatch(restoreVoteDetailCreator({ upVotesBy, downVotesBy }));
      alert(error.message);
    }
  };
}

const setDetailUpVote = (threadId) => performVoteDetail(threadId, 'upvote');
const setDetailDownVote = (threadId) => performVoteDetail(threadId, 'downvote');
const setDetailNeutralVote = (threadId) => performVoteDetail(threadId, 'neutral');
/**
 * VOTE COMMENT
 */
function cloneCommentVotes(commentId) {
  return function (getState) {
    const thread = getState().threadDetail;
    const comment = thread.comments.find((comment) => comment.id === commentId);
    if (!comment) {
      return [[], []];
    }
    const upVotesBy = [...comment.upVotesBy];
    const downVotesBy = [...comment.downVotesBy];
    return [upVotesBy, downVotesBy, thread.id];
  };
}

function performVoteComment(commentId, actionType) {
  return async (dispatch, getState) => {
    const authUser = getState().authUser;
    const [upVotesBy, downVotesBy, threadId] = cloneCommentVotes(commentId)(getState);

    try {
      if (!authUser || !authUser.id) {
        throw new Error('Anda perlu login!');
      }

      switch (actionType) {
        case 'upvote':
          dispatch(upVoteCommentCreator(commentId, authUser.id));
          await api.setUpVoteComment(threadId, commentId);
          break;
        case 'downvote':
          dispatch(downVoteCommentCreator(commentId, authUser.id));
          await api.setDownVoteComment(threadId, commentId);
          break;
        case 'neutral':
          dispatch(neutralVoteCommentCreator(commentId, authUser.id));
          await api.setNeutralVoteComment(threadId, commentId);
          break;
        default:
          throw new Error('Tipe aksi tidak valid');
      }
    } catch (error) {
      dispatch(restoreVoteCommentCreator({ commentId, upVotesBy, downVotesBy }));
      alert(error.message);
    }
  };
}

const setCommentUpVote = (commentId) => performVoteComment(commentId, 'upvote');
const setCommentDownVote = (commentId) => performVoteComment(commentId, 'downvote');
const setCommentNeutralVote = (commentId) => performVoteComment(commentId, 'neutral');

const addComment = (content) => async (dispatch, getState) => {
  dispatch(showLoading());
  const authUser = getState().authUser;
  const thread = getState().threadDetail;
  try {
    if (!authUser || !authUser.id) {
      throw new Error('Anda perlu login!');
    }
    const comment = await api.createComment(thread.id, content);
    dispatch(addCommentCreator(comment));
    dispatch(hideLoading());
    return true;
  } catch (error) {
    alert(error.message);
    dispatch(hideLoading());
    return false;
  }
};
export {
  getThreadDetail,
  clearThreadDetail,
  setDetailUpVote,
  setDetailDownVote,
  setDetailNeutralVote,
  setCommentUpVote,
  setCommentDownVote,
  setCommentNeutralVote,
  addComment,
};
