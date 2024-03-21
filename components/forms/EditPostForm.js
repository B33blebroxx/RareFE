import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Form, Button } from 'react-bootstrap';
import { getSinglePost, updatePost } from '../../api/postsApi';
import { useAuth } from '../../utils/context/authContext';

const EditPostForm = () => {
  const [postData, setPostData] = useState({
    title: '',
    content: '',
    imageUrl: '',
  });
  const { user } = useAuth();
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      getSinglePost(id)
        .then((data) => {
          setPostData({
            title: data.title,
            content: data.content,
            imageUrl: data.imageUrl || '',
          });
        })
        .catch((error) => {
          console.error('Failed to fetch post for editing:', error);
        });
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPostData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...postData,
      rareUserId: user[0]?.id,
    };

    updatePost(id, payload)
      .then(() => {
        router.push(`/posts/${id}`);
      })
      .catch((error) => {
        console.error('Failed to update post:', error);
      });
  };

  return (
    <div className="postform-container">
      <Form onSubmit={handleSubmit} className="postForm">
        <h1>Edit Post</h1><br />
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
          <Form.Label>Content</Form.Label>
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
          <Form.Label>Header Image URL</Form.Label>
          <Form.Control
            type="text"
            name="imageUrl"
            value={postData.imageUrl}
            onChange={handleChange}
          />
        </Form.Group>
        <br />
        <Button id="editpost" className="editPostBtn m-2" variant="outline-info" type="submit">
          Save Changes
        </Button>
      </Form>
    </div>
  );
};

export default EditPostForm;
