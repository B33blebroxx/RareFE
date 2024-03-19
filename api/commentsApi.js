import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const updateComment = (id, payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/comments/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const viewSinglePostComments = (postId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/posts/${postId}/comments`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const getSingleComment = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/comments/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const deleteComment = (commentId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/comments/${commentId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    // .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});
const createComment = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/comments/new`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  }).then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

export {
  viewSinglePostComments, updateComment, createComment, deleteComment, getSingleComment,
};
