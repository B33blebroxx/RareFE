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
  const [commentContent, setCommentContent] = useState(initialState);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (commentObj.id) setCommentContent(commentObj);
  }, [commentObj, user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (commentObj.id) {
      const payload = { content: commentContent };
      updateComment(commentObj.id, payload)
        .then(() => {
          // Reset the textarea to an empty string
          setCommentContent(initialState);
          onUpdate();
        })
        .then(() => router.push(`/posts/${postObj.id}`));
    } else {
      const newPayload = {
        AuthorId: user[0].id,
        PostId: postObj.id,
        Content: commentContent,
      };
      await createComment(newPayload);
      setCommentContent(initialState);
      onUpdate();
    }
  };

  return (
    <>
      <div className="commentform-container">
        <Form onSubmit={handleSubmit} className="userForm">
          <h1 className="text-white mt-5">{commentObj.id ? 'Update' : 'Add'} Comment</h1><br />
          <Form.Group className="mb-3">
            <Form.Label>Content</Form.Label>
            <Form.Control
              as="textarea"
              style={{ height: '100px' }}
              name="content"
              value={commentContent.content}
              onChange={(e) => setCommentContent(e.target.value)}
              placeholder="Write your comment here..."
              required
            />
          </Form.Group>
          <Button
            id="commentbtn"
            variant="outline-secondary"
            type="submit"
          >
            {commentObj.id ? 'Update' : 'Add Comment'}
          </Button><br /><br />
        </Form>
      </div>
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
