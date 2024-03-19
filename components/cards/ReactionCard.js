import React from 'react';
import { PropTypes } from 'prop-types';
import { Card, Image } from 'react-bootstrap';

function ReactionCard({ reactionObj, incrementReaction }) {
  const addOne = () => {
    incrementReaction(reactionObj.id);
  };
  return (
    <>
      <Card className="card-reactions" style={{ width: '100px' }}>
        <div>
          <Image src={reactionObj.image} alt={reactionObj.label} onClick={addOne} style={{ cursor: 'pointer' }} />
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
  incrementReaction: PropTypes.func.isRequired,
};

export default ReactionCard;
