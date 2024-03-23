/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { getSingleUser } from '../../../api/rareUserApi';
import { getUsersPosts, deletePost } from '../../../api/postsApi';
import UserCard from '../../../components/cards/UserCard';
import { useAuth } from '../../../utils/context/authContext';
import PostCard from '../../../components/cards/postCard';
import {
  getAuthorsSubscriptions, subscribeToUser, subscriberCount, unsubscribeFromUser,
} from '../../../api/subscriptionApi';

export default function ViewUserProfileAndPosts() {
  const [userProfile, setUserProfile] = useState({});
  const [userPosts, setUserPosts] = useState([]);
  const { user } = useAuth();
  const router = useRouter();
  const { id } = router.query;
  const isCurrentUserProfile = user.uid === userProfile.uid;
  const isNotCurrentUserProfile = user.uid !== userProfile.uid;
  const [subscribers, setSubscribers] = useState([]);
  const [button, setButton] = useState('');
  const [subCount, setSubCount] = useState(0);

  const getSubs = () => {
    const authorId = Number(id);
    getAuthorsSubscriptions(authorId).then(setSubscribers);
  };

  const totalSubs = () => {
    subscriberCount(id).then(setSubCount);
  };

  const checkSub = () => {
    const isSubscribed = subscribers.some((subId) => subId === user[0].id);
    setButton(isSubscribed ? 'Unsubscribe' : 'Subscribe');
  };

  const handleClick = () => {
    const isSubscribed = subscribers.some((subId) => subId === user[0].id);

    if (!isSubscribed) {
      const payload = {
        followerId: user[0].id,
        authorId: Number(id),
        createdOn: new Date().toISOString(),
      };
      subscribeToUser(payload).then(() => {
        setSubscribers((subs) => [...subs, user[0].id]);
        setSubCount((count) => count + 1);
        setButton('Unsubscribe');
        getSingleUser(id).then(setUserProfile);
        getUsersPosts(id).then(setUserPosts);
      });
    } else {
      const subId = user[0].id;
      unsubscribeFromUser(Number(id), subId).then(() => {
        setSubscribers((subs) => subs.filter((sub) => sub !== subId));
        setSubCount((count) => count - 1);
        setButton('Subscribe');
        getSingleUser(id).then(setUserProfile);
        getUsersPosts(id).then(setUserPosts);
      });
    }
  };

  useEffect(() => {
    if (id) {
      getSingleUser(id).then(setUserProfile);
      getUsersPosts(id).then(setUserPosts);
    }
    getSubs();
    checkSub();
    totalSubs();
  }, [id]);

  const handleDelete = (postId) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this post?');
    if (isConfirmed) {
      deletePost(postId).then(() => {
        setUserPosts((currentPosts) => currentPosts.filter((post) => post.id !== postId));
      }).catch((error) => {
        console.error('Error deleting post:', error);
      });
    }
  };

  const handleEdit = (postId) => {
    router.push(`/posts/edit/${postId}`);
  };

  return (
    <>
      <div className="card-container">
        <h2>Profile</h2><br />
        <UserCard userObj={userProfile} onUpdate={setUserProfile} />
      </div>
      <hr
        style={{
          backgroundColor: 'white',
          color: 'white',
          borderColor: 'white',
          height: '2px',
        }}
      />
      <div className="card-container">{isNotCurrentUserProfile && (
        <Button variant="outline-primary" onClick={handleClick}>{button}</Button>
      )}
        <h3>Subscribers: {subCount}</h3>
      </div>
      <div className="card-container">
        <h2>Posts</h2><br />
        {userPosts.map((post) => (
          <PostCard
            key={post.id}
            postObj={post}
            onDelete={handleDelete}
            onEdit={handleEdit}
            isUserPost={isCurrentUserProfile}
          />
        ))}<br />
        {isCurrentUserProfile && (
          <Link passHref href="/posts/createPost">
            <Button variant="outline-secondary">Create New Post</Button>
          </Link>
        )}
      </div>
    </>
  );
}
