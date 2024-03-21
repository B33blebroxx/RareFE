/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import PostCard from '../../components/cards/postCard';
import { getUsersPosts, deletePost } from '../../api/postsApi';
import { useAuth } from '../../utils/context/authContext';

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user && user[0]?.id) {
      getUsersPosts(user[0].id).then(setPosts);
    }
  }, [user]);

  const handleEdit = (postId) => {
    router.push(`/posts/edit/${postId}`);
  };

  const handleDelete = (postId) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this post?');
    if (isConfirmed) {
      deletePost(postId).then(() => {
        setPosts((currentPosts) => currentPosts.filter((post) => post.id !== postId));
      }).catch((err) => {
        console.error('Error deleting post:', err);
      });
    }
  };

  return (
    <>
      <br />
      <h2>My Posts</h2>
      <div id="createpost">
        <Button
          id="addpostbtn"
          className="addBtn m-2"
          variant="outline-secondary"
          onClick={() => router.push('/posts/createPost')}
        >Add a Post
        </Button>
      </div>
      <div className="card-container">
        {posts.map((post) => (
          <PostCard
            key={post.id}
            postObj={post}
            onEdit={handleEdit}
            onDelete={handleDelete}
            isUserPost
          />
        ))}
      </div>
    </>
  );
}
