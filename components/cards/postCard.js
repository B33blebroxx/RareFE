import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { PropTypes } from 'prop-types';

function PostCard({ postObj }) {
  return (
    <>
      <Card className="card-style" style={{ width: '48rem' }}>
        <Card.Img variant="top" src={postObj.imageUrl} />
        <Card.Body>
          <Card.Title>{postObj.title}</Card.Title>
          <Card.Text>By {postObj.authorDisplayName}</Card.Text>
          <Card.Text>{postObj.publicationDate}</Card.Text>
          <br />
          <Card.Text>{postObj.content}</Card.Text>
          <Button>Details</Button>
        </Card.Body>
      </Card>
    </>
  );
}

PostCard.propTypes = {
  postObj: PropTypes.shape({
    title: PropTypes.string,
    publicationDate: PropTypes.string,
    authorDisplayName: PropTypes.string,
    imageUrl: PropTypes.string,
    content: PropTypes.string,
  }).isRequired,
};

export default PostCard;
