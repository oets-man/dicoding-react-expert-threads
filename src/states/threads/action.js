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

const setUpVote = (threadId) => async (dispatch, getState) => {
  const authUser = getState().authUser;
  const [upVotesBy, downVotesBy] = cloneThreadVotes(threadId)(getState);

  try {
    if (!authUser || !authUser.id) {
      throw new Error('Anda perlu login!');
    }
    dispatch(upVoteCreator(threadId, authUser.id));
    await api.setUpVote(threadId);
  } catch (error) {
    dispatch(restoreVoteCreator({ threadId, upVotesBy, downVotesBy }));
    alert(error.message);
  }
};

const setDownVote = (threadId) => async (dispatch, getState) => {
  const authUser = getState().authUser;
  const [upVotesBy, downVotesBy] = cloneThreadVotes(threadId)(getState);

  try {
    if (!authUser || !authUser.id) {
      throw new Error('Anda perlu login!');
    }
    dispatch(downVoteCreator(threadId, authUser.id));
    await api.setDownVote(threadId);
  } catch (error) {
    dispatch(restoreVoteCreator({ threadId, upVotesBy, downVotesBy }));
    alert(error.message);
  }
};

const setNeutralVote = (threadId) => async (dispatch, getState) => {
  const authUser = getState().authUser;
  const [upVotesBy, downVotesBy] = cloneThreadVotes(threadId)(getState);

  try {
    if (!authUser || !authUser.id) {
      throw new Error('Anda perlu login!');
    }
    dispatch(neutralVoteCreator(threadId, authUser.id));
    await api.setNeutralVote(threadId);
  } catch (error) {
    dispatch(restoreVoteCreator({ threadId, upVotesBy, downVotesBy }));
    alert(error.message);
  }
};

export { addThread, getThreads, setUpVote, setDownVote, setNeutralVote };
