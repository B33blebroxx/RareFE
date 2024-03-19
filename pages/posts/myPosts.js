/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import PostCard from '../../components/cards/postCard';
import { getUsersPosts } from '../../api/postsApi';
import { useAuth } from '../../utils/context/authContext';

export default function Posts() {
  const [post, setPost] = useState([]);
  const { user } = useAuth();

  const currentUserId = user[0].id;

  const myPosts = () => {
    getUsersPosts(currentUserId).then(setPost);
  };

  useEffect(() => {
    myPosts(currentUserId);
  }, [currentUserId]);

  return (
    <>
      <h2>My Posts</h2>
      <div className="card-container">
        {post.map((posts) => (
          <PostCard key={posts.id} postObj={posts} onUpdate={myPosts} />
        ))}
      </div>
    </>
  );
}
