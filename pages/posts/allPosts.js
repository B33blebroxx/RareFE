/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import PostCard from '../../components/cards/postCard';
import { getAllPosts } from '../../api/postsApi';

export default function Posts() {
  const [post, setPost] = useState([]);

  const allPosts = () => {
    getAllPosts().then(setPost);
  };

  useEffect(() => {
    allPosts();
  }, []);

  return (
    <>
      <br />
      <h2>All Posts</h2>
      <div className="card-container">
        {post.map((posts) => (
          <PostCard key={posts.id} postObj={posts} onUpdate={allPosts} />
        ))}
      </div>
    </>
  );
}
