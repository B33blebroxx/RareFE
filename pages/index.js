import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import { getSubscribedPosts } from '../api/postsApi';
import { useAuth } from '../utils/context/authContext';
import PostCard from '../components/cards/postCard';
import RegisterForm from '../components/RegisterForm';
import { checkUser } from '../utils/auth';

export default function Homepage() {
  const [post, setPost] = useState([]);
  const { user } = useAuth();
  const router = useRouter();
  const [isRegistered, setIsRegistered] = useState(false);

  useEffect(() => {
    if (user && user[0] && user[0].id) {
      checkUser(user[0].id).then((response) => {
        if (response && !response.error) {
          setIsRegistered(true);
          const currentUserId = user[0].id;
          getSubscribedPosts(currentUserId).then(setPost);
        } else {
          setIsRegistered(false);
        }
      });
    }
    console.log(user[0]);
  }, [user]);

  if (!isRegistered) {
    return <RegisterForm />;
  }

  return (
    <>
      <br />
      <h2>Sub Posts</h2>
      <div id="createpost">
        <Button
          className="addBtn m-2"
          variant="outline-secondary"
          onClick={() => router.push('/posts/createPost')}
        >
          Add a Post
        </Button>
      </div>
      <div className="card-container">
        {post.map((posts) => (
          <PostCard key={posts.id} postObj={posts} onUpdate={() => getSubscribedPosts(user[0].id)} />
        ))}
      </div>
    </>
  );
}
