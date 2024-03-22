import React from 'react';
import { PropTypes } from 'prop-types';
import { Card } from 'react-bootstrap';

function AllReactionsCard({ onClick, reactionObj }) {
  const handleOnClick = () => {
    if (onClick) {
      onClick(reactionObj.id);
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
          <Card.Img variant="top" src={reactionObj.image} alt={reactionObj.label} style={{ cursor: 'pointer' }} />
        </div>
      </Card>
    </>
  );
}

AllReactionsCard.propTypes = {
  reactionObj: PropTypes.shape({
    id: PropTypes.number,
    label: PropTypes.string,
    image: PropTypes.string,
    count: PropTypes.number,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default AllReactionsCard;
