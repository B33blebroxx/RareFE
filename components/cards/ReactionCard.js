import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import { Card } from 'react-bootstrap';
import { getSinglePost } from '../../api/postsApi';
import { useAuth } from '../../utils/context/authContext';
import { addReaction } from '../../api/reactionsApi';

function ReactionCard({ reactionObj, postObj, onUpdate }) {
  const [post, setPost] = useState({});
  const { user } = useAuth();

  const incrementReaction = () => {
    getSinglePost(postObj.id).then(() => setPost());
    const payload = {
      postId: post.id, rareUserId: user.id, reactionId: reactionObj.id,
    };
    addReaction(payload).then(() => onUpdate());
  };

  return (
    <>
      <Card className="card-reactions" style={{ width: '100px' }}>
        <div>
          <Card.Img variant="top" src={reactionObj.image} alt={reactionObj.label} onClick={incrementReaction} style={{ cursor: 'pointer' }} />
        </div>
        <Card.Body>
          <Card.Title>{reactionObj.label}</Card.Title>
          <Card.Text>{reactionObj.count}</Card.Text>
        </Card.Body>
      </Card>
    </>
  );
}

ReactionCard.propTypes = {
  reactionObj: PropTypes.shape({
    id: PropTypes.number,
    label: PropTypes.string,
    image: PropTypes.string,
    count: PropTypes.number,
  }).isRequired,
  postObj: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    publicationDate: PropTypes.string,
    authorDisplayName: PropTypes.string,
    imageUrl: PropTypes.string,
    content: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default ReactionCard;
