/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { getSubscribedPosts } from '../api/postsApi';
import { useAuth } from '../utils/context/authContext';
import PostCard from '../components/cards/postCard';

export default function Homepage() {
  const [post, setPost] = useState([]);
  const { user } = useAuth();

  const currentUserId = user[0].id;

  const subPosts = () => {
    getSubscribedPosts(currentUserId).then(setPost);
  };

  useEffect(() => {
    subPosts(currentUserId);
  }, [currentUserId]);

  return (
    <>
      <h2>Sub Posts</h2>
      <div className="card-container">
        {post.map((posts) => (
          <PostCard key={posts.id} postObj={posts} onUpdate={subPosts} />
        ))}
      </div>
    </>
  );
}
