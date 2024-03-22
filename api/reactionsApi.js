import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getAPostsReactions = (postId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/posts/${postId}/reaction-details`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const getReactionsTotals = (postId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/post/${postId}/reactions`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});
const getAllReactions = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/reactions`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to fetch reactions');
      }
      return response.json();
    })
    .then((data) => {
      // Check if data is an array and not empty
      if (Array.isArray(data) && data.length > 0) {
        resolve(data);
      } else {
        resolve([]); // Return an empty array if there are no reactions
      }
    })
    .catch((error) => {
      reject(error); // Reject with the error message
    });
});

const addReaction = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/post/add-reaction`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    // .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});
const getSingleReaction = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/reactions/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

export {
  getAPostsReactions, getSingleReaction, getAllReactions, getReactionsTotals, addReaction,
};
