import React, { useEffect, useState } from 'react';
import { getAllPosts } from '../api/postsApi';
import PostCard from '../components/cards/postCard';

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
      <div className="card-container">
        {post.map((posts) => (
          <PostCard key={posts.id} postObj={posts} onUpdate={allPosts} />
        ))}
      </div>
    </>
  );
}
