import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getAPostsReactions = (postId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/post/${postId}/reaction-details`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((r) => r.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const getReactionsTotals = (postId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/post/${postId}/reaction-details`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((r) => r.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const addReaction = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/post/add-reaction`, {
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
  getAPostsReactions, getReactionsTotals, addReaction,
};
