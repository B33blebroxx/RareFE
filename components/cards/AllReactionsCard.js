import React from 'react';
import { PropTypes } from 'prop-types';
import { Card } from 'react-bootstrap';

function AllReactionsCard({ onClick, reactionObj }) {
  const handleOnClick = () => {
    if (onClick) {
      onClick(reactionObj.reactId);
    }
  };
  return (
    <>
      <Card
        className="cReactions"
        style={{
          width: '30px',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: '10px', // Added gap between items
          flexWrap: 'wrap', // Added to ensure space between items
        }}
        onClick={handleOnClick}
      >
        <div>
          <Card.Img variant="top" src={reactionObj.imageUrl} alt={reactionObj.label} style={{ cursor: 'pointer' }} />
        </div>
      </Card>
    </>
  );
}

AllReactionsCard.propTypes = {
  reactionObj: PropTypes.shape({
    reactId: PropTypes.number,
    label: PropTypes.string,
    imageUrl: PropTypes.string,
    count: PropTypes.number,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default AllReactionsCard;
