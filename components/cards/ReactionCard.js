import React from 'react';
import { PropTypes } from 'prop-types';
import { Button, Card } from 'react-bootstrap';

function ReactionCard({ reactionObj, incrementReaction }) {
  const addOne = () => {
    incrementReaction(reactionObj.id);
  };
  return (
    <>
      <Card className="card-style" style={{ width: '48rem' }}>
        <div>
          <Button onClick={addOne}><Card.Img variant="top" src={reactionObj.image} /></Button>
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
