import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Form } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createComment, updateComment } from '../../api/commentsApi';

const initialState = {
  content: '',
};

export default function CommentForm({ commentObj, postObj, onUpdate }) {
  const { user } = useAuth();
  const [formInput, setFormInput] = useState({
    ...initialState,
    postId: postObj ? postObj.id : '',
  });
  const router = useRouter();

  useEffect(() => {
    if (commentObj.id) setFormInput(commentObj);
  }, [commentObj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (commentObj.id) {
      const payload = { createdOn: commentObj.createdOn, ...formInput };
      updateComment(payload).then(() => router.push(`/user/${commentObj.id}`));
    } else {
      createComment({ ...formInput, authorId: user.id }).then(onUpdate);
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit} className="userForm">
        <h1 className="text-white mt-5">{commentObj.id ? 'Update' : 'Add'} User</h1>
        <Form.Group className="mb-3">
          <Form.Label>Content</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="Description"
            style={{ height: '100px' }}
            name="content"
            value={formInput.content}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Button variant="outline-secondary" type="submit">
          {commentObj.id ? 'Update' : 'Add Comment'}
        </Button>
      </Form>
    </>
  );
}

CommentForm.propTypes = {
  commentObj: PropTypes.shape({
    id: PropTypes.number,
    authorId: PropTypes.number,
    postId: PropTypes.number,
    content: PropTypes.string,
    createdOn: PropTypes.string,
  }),
  postObj: PropTypes.shape({
    id: PropTypes.number,
    rareUserId: PropTypes.number,
    title: PropTypes.string,
    publicationDate: PropTypes.string,
    imageUrl: PropTypes.string,
    content: PropTypes.string,
    approved: PropTypes.bool,
  }).isRequired,

  onUpdate: PropTypes.func.isRequired,
};

CommentForm.defaultProps = {
  commentObj: initialState,
};
