import { showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';
import { hideLoading } from 'react-redux-loading-bar';
import {
  addThreadCreator,
  downVoteCreator,
  getThreadsCreator,
  neutralVoteCreator,
  restoreVoteCreator,
  upVoteCreator,
} from './creator';

function getThreads() {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const threads = await api.getAllThreads();
      dispatch(getThreadsCreator(threads));
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

function addThread({ title, body, category = '' }) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const thread = await api.createThread({ title, body, category });
      dispatch(addThreadCreator(thread));
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

function cloneThreadVotes(threadId) {
  return function (getState) {
    const thread = getState().threads.find((thread) => thread.id === threadId);
    if (!thread) {
      return [[], []];
    }
    const upVotesBy = [...thread.upVotesBy];
    const downVotesBy = [...thread.downVotesBy];
    return [upVotesBy, downVotesBy];
  };
}

const performVote = (threadId, actionType) => async (dispatch, getState) => {
  const authUser = getState().authUser;
  const [upVotesBy, downVotesBy] = cloneThreadVotes(threadId)(getState);

  try {
    if (!authUser || !authUser.id) {
      throw new Error('Anda perlu login!');
    }

    switch (actionType) {
      case 'upvote':
        dispatch(upVoteCreator(threadId, authUser.id));
        await api.setUpVote(threadId);
        break;
      case 'downvote':
        dispatch(downVoteCreator(threadId, authUser.id));
        await api.setDownVote(threadId);
        break;
      case 'neutral':
        dispatch(neutralVoteCreator(threadId, authUser.id));
        await api.setNeutralVote(threadId);
        break;
      default:
        throw new Error('Tipe aksi tidak valid');
    }
  } catch (error) {
    dispatch(restoreVoteCreator({ threadId, upVotesBy, downVotesBy }));
    alert(error.message);
  }
};

const setUpVote = (threadId) => performVote(threadId, 'upvote');
const setDownVote = (threadId) => performVote(threadId, 'downvote');
const setNeutralVote = (threadId) => performVote(threadId, 'neutral');

export { addThread, getThreads, setUpVote, setDownVote, setNeutralVote };
