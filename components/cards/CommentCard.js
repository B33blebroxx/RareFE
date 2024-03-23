import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import { useAuth } from '../../utils/context/authContext';
import { deleteComment } from '../../api/commentsApi';

function CommentCard({ commentObj, onUpdate }) {
  const { user } = useAuth();
  const deleteThisComment = () => {
    if (window.confirm(`Delete the comment by ${commentObj.authorName}?`)) {
      deleteComment(commentObj.id).then(() => onUpdate());
    }
  };

  return (
    <Card style={{ width: '18rem', margin: '15px auto' }}>
      <Card.Body>
        <Card.Title>Author Name: {commentObj.authorName}</Card.Title>
        <p>{commentObj.createdOn}</p>
        <p>{commentObj.content}</p>

        {user[0].id === commentObj.authorId ? (
          <div className="buttonWrap">
            <Link href={`/comments/edit/${commentObj.id}`} passHref>
              <Button id="cmntedit" className="editBtn m-2">EDIT</Button>
            </Link>
            <div>
              <Button id="cmntdlt" size="sm" onClick={deleteThisComment} className="deleteBtn m-2">
                DELETE
              </Button>
            </div>
          </div>
        ) : (
          ''
        )}

      </Card.Body>
    </Card>
  );
}

CommentCard.propTypes = {
  commentObj: PropTypes.shape({
    id: PropTypes.number,
    authorId: PropTypes.number,
    postId: PropTypes.number,
    content: PropTypes.string,
    authorName: PropTypes.string,
    createdOn: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default CommentCard;
