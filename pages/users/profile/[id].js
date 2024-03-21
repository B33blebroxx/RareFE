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

export default function ViewUserProfileAndPosts() {
  const [userProfile, setUserProfile] = useState({});
  const [userPosts, setUserPosts] = useState([]);
  const { user } = useAuth();
  const router = useRouter();
  const { id } = router.query;
  const isCurrentUserProfile = user.uid === userProfile.uid;
  const getPosts = () => {
    getUsersPosts(id).then(setUserPosts);
  };

  useEffect(() => {
    getSingleUser(id).then(setUserProfile);
    getPosts(id);
  }, [id]);

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

      <div className="card-container">
        <h2>Posts</h2><br />
        {userPosts.map((post) => (
          <PostCard key={post.id} postObj={post} onUpdate={getPosts} />
        ))}<br />
        {isCurrentUserProfile && (
        <Link passHref href="/posts/createPost">
          <Button variant="outline-primary">Create New Post</Button>
        </Link>
        )}
      </div>
    </>
  );
}
