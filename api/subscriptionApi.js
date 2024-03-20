import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const subscribeToUser = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/subscriptions/new`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const unsubscribeFromUser = (subId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/subscriptions/${subId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const subscriberCount = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/user/${id}/subscribers`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const checkSubscription = (followerId, authorId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/subscriptions/check/${followerId}/${authorId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

export {
  subscribeToUser, unsubscribeFromUser, subscriberCount, checkSubscription,
};
