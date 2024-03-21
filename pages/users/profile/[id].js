/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { getSingleUser } from '../../../api/rareUserApi';
import { getUsersPosts } from '../../../api/postsApi';
import UserCard from '../../../components/cards/UserCard';
import { useAuth } from '../../../utils/context/authContext';
import PostCard from '../../../components/cards/postCard';
import { getSubscription, subscribeToUser, unsubscribeFromUser } from '../../../api/subscriptionApi';

export default function ViewUserProfileAndPosts() {
  const [userProfile, setUserProfile] = useState({});
  const [userPosts, setUserPosts] = useState([]);
  const { user } = useAuth();
  const router = useRouter();
  const { id } = router.query;
  const isCurrentUserProfile = user.uid === userProfile.uid;
  const isNotCurrentUserProfile = user.uid !== userProfile.uid;

  const getPosts = () => {
    getUsersPosts(id).then(setUserPosts);
  };

  const checkSub = () => {
    const subId = user[0].id;
    const authorId = id;
    getSubscription(authorId, subId);
  };

  const handleClick = () => {
    const subId = user[0].id;
    const authorId = id;

    if (checkSub === true) {
      const payload = {
        followerId: user[0].id,
        authorId: userProfile.id,
        createdOn: new Date().toISOString(),
      };
      subscribeToUser(payload);
    } else {
      unsubscribeFromUser(authorId, subId);
    }
  };

  useEffect(() => {
    getSingleUser(id).then(setUserProfile);
    getPosts(id);
    checkSub();
  }, [userProfile.id, checkSub()]);

  return (
    <>
      <div>{isNotCurrentUserProfile && (
        <Button variant="outline-primary" onClick={handleClick}>Subscribe</Button>
      )}
      </div>
      <div id="user-profile-view-container">
        <UserCard userObj={userProfile} onUpdate={setUserProfile} />
      </div>
      <hr
        style={{
          backgroundColor: 'black',
          color: 'black',
          borderColor: 'black',
          height: '1px',
        }}
      />
      <div id="create-post-btn">{isCurrentUserProfile && (
      <Link passHref href="/posts/createPost">
        <Button variant="outline-primary">Create Post</Button>
      </Link>
      )}
      </div>
      <div id="post-view-container">
        {userPosts.map((post) => (
          <PostCard key={post.id} postObj={post} onUpdate={getPosts} />
        ))}
      </div>
    </>
  );
}
