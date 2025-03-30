const api = (() => {
  const BASE_URL = 'https://forum-api.dicoding.dev/v1/';

  async function _fetchGuest(endPoint, options = {}) {
    try {
      const response = await fetch(BASE_URL + endPoint, {
        ...options,
        headers: {
          ...options.headers,
          headers: { 'Content-Type': 'application/json' },
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseJson = await response.json();
      const { status, data, message } = responseJson;

      if (status !== 'success') {
        throw new Error(message);
      }

      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async function _fetchAuth(endPoint, options = {}) {
    const token = getAccessToken();
    if (!token) {
      alert('Anda belum login');
      throw new Error('No access token found');
    }
    return _fetchGuest(endPoint, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
  }

  function putAccessToken(token) {
    localStorage.setItem('accessToken', token);
  }

  function getAccessToken() {
    return localStorage.getItem('accessToken');
  }

  async function register({ email, name, password }) {
    try {
      const { user } = await _fetchGuest('register', {
        method: 'POST',
        body: JSON.stringify({
          email,
          name,
          password,
        }),
      });
      return user;
    } catch (error) {
      console.error('error register', error.message);
    }
  }

  async function login({ email, password }) {
    try {
      const { token } = await _fetchGuest(`login`, {
        method: 'POST',
        body: JSON.stringify({
          email,
          password,
        }),
      });
      return token;
    } catch (error) {
      console.error('error login', error.message);
    }
  }

  async function getAllUsers() {
    try {
      const { users } = await _fetchGuest(`users`, {
        method: 'GET',
      });

      return users;
    } catch (error) {
      console.error('error get all users', error.message);
    }
  }

  async function getOwnProfile() {
    try {
      const { user } = await _fetchAuth(`users/me`, {
        method: 'GET',
      });

      return user;
    } catch (error) {
      console.error('error get own profile', error.message);
    }
  }

  async function createThread({ title, body, category = '' }) {
    try {
      const { thread } = await _fetchAuth(`threads`, {
        method: 'POST',
        body: JSON.stringify({
          title,
          body,
          category,
        }),
      });
      return thread;
    } catch (error) {
      console.error('error create thread', error.message);
    }
  }

  async function getAllThreads() {
    try {
      const { threads } = await _fetchGuest(`threads`, {
        method: 'GET',
      });
      return threads;
    } catch (error) {
      console.error('error get all threads', error.message);
    }
  }

  async function getThreadDetail(id) {
    try {
      const response = await _fetchGuest(`threads/${id}`, {
        method: 'GET',
      });
      const { detailThread } = await response.json();
      return detailThread;
    } catch (error) {
      console.error('error get thread detail', error.message);
    }
  }

  async function createComment({ threadId, content }) {
    try {
      const { comment } = await _fetchAuth(`threads/${threadId}/comments`, {
        method: 'POST',
        body: JSON.stringify({
          content,
        }),
      });
      return comment;
    } catch (error) {
      console.error('error create comment', error.message);
    }
  }

  async function setUpVote(threadId) {
    try {
      const { vote } = await _fetchAuth(`threads/${threadId}/up-vote`, {
        method: 'POST',
      });

      return vote;
    } catch (error) {
      console.error('error set up vote', error.message);
    }
  }

  async function setDownVote(threadId) {
    try {
      const { vote } = await _fetchAuth(`threads/${threadId}/down-vote`, {
        method: 'POST',
      });

      return vote;
    } catch (error) {
      console.error('error set down vote', error.message);
    }
  }

  async function setNeutralVote(threadId) {
    try {
      const { vote } = await _fetchAuth(`threads/${threadId}/neutral-vote`, {
        method: 'POST',
      });

      return vote;
    } catch (error) {
      console.error('error set neutral vote', error.message);
    }
  }

  async function getLeaderboards() {
    try {
      const leaderboards = await _fetchGuest(`leaderboards`, {
        method: 'GET',
      });
      return leaderboards;
    } catch (error) {
      console.error('error get leaderboards', error.message);
    }
  }

  return {
    putAccessToken,
    getAccessToken,
    register,
    login,
    getOwnProfile,
    getAllUsers,
    getAllThreads,
    createThread,
    getThreadDetail,
    createComment,
    setUpVote,
    setDownVote,
    setNeutralVote,
    getLeaderboards,
  };
})();

export default api;
