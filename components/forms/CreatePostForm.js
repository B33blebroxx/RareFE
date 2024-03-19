import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Form, Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createPost } from '../../api/postsApi';

const CreatePostForm = () => {
  const [postData, setPostData] = useState({
    title: '',
    content: '',
    category: '',
    imageUrl: '',
  });
  const { user } = useAuth();
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPostData({ ...postData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = user[0]?.id;

    if (!userId) {
      console.warn('User ID is undefined');
      return;
    }

    const payload = {
      ...postData,
      publicationDate: new Date().toISOString(),
      approved: true,
      rareUserId: userId,
    };

    createPost(payload)
      .then((newPost) => {
        router.push(`/posts/${newPost.id}`);
      })
      .catch((error) => {
        console.error('Failed to create post', error);
      });
  };

  return (
    <div className="postform-container">
      <Form onSubmit={handleSubmit} className="postForm">
        <h1>Add Post</h1><br />
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={postData.title}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Content:</Form.Label>
          <Form.Control
            as="textarea"
            style={{ height: '100px' }}
            name="content"
            value={postData.content}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Header Image URL:</Form.Label>
          <Form.Control
            type="text"
            name="imageUrl"
            value={postData.imageUrl}
            onChange={handleChange}
          />
        </Form.Group>
        <br />
        <Button id="createpost" className="addPostBtn m-2" variant="outline-info" type="submit">
          Create Post
        </Button>
      </Form>
    </div>
  );
};

export default CreatePostForm;
