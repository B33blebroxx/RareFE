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

export default function ViewUserProfileAndPosts() {
  const [userProfile, setUserProfile] = useState({});
  const [userPosts, setUserPosts] = useState([]);
  const { user } = useAuth();
  const router = useRouter();
  const { id } = router.query;
  const isCurrentUserProfile = user.uid === userProfile.uid;

  useEffect(() => {
    if (id) {
      getSingleUser(id).then(setUserProfile);
      getUsersPosts(id).then(setUserPosts);
    }
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
