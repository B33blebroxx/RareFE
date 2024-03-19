/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import PostCard from '../../components/cards/postCard';
import { getUsersPosts } from '../../api/postsApi';
import { useAuth } from '../../utils/context/authContext';

export default function Posts() {
  const [post, setPost] = useState([]);
  const { user } = useAuth();
  const router = useRouter();

  const currentUserId = user[0].id;

  const myPosts = () => {
    getUsersPosts(currentUserId).then(setPost);
  };

  useEffect(() => {
    myPosts(currentUserId);
  }, [currentUserId]);

  return (
    <>
      <br />
      <h2>My Posts</h2>
      <br />
      <div id="createpost">
        <Button
          className="addBtn m-2"
          variant="outline-info"
          onClick={() => router.push('/posts/createPost')}
        >Add a Post
        </Button>
      </div>
      <div className="card-container">
        {post.map((posts) => (
          <PostCard key={posts.id} postObj={posts} onUpdate={myPosts} />
        ))}
      </div>
    </>
  );
}
