/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { PropTypes } from 'prop-types';
import Link from 'next/link';

function PostCard({
  postObj, onDelete, onEdit, isUserPost,
}) {
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
          <Link href={`/posts/${postObj.id}`} passHref>
            <Button id="viewuser" aria-label="View">
              <img src="/view2.png" alt="view" title="view" style={{ width: '24px', height: '24px' }} />
            </Button>
          </Link>
          {isUserPost && (
          <Button
            id="editpost"
            aria-label="Edit"
            variant="secondary"
            onClick={() => onEdit(postObj.id)}
          >
            <img src="/editicon.png" alt="Edit" title="Edit" style={{ width: '24px', height: '24px' }} />
          </Button>
          )}
          {isUserPost && (
          <Button
            id="deletepost"
            onClick={() => onDelete(postObj.id)}
            aria-label="Delete"
          >
            <img src="/deleteicon.png" alt="Delete" title="Delete" style={{ width: '24px', height: '24px' }} />
          </Button>
          )}
        </Card.Body>
      </Card>
    </>
  );
}

PostCard.propTypes = {
  postObj: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    publicationDate: PropTypes.string,
    authorDisplayName: PropTypes.string,
    imageUrl: PropTypes.string,
    content: PropTypes.string,
  }).isRequired,
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
  isUserPost: PropTypes.bool,
};
PostCard.defaultProps = {
  onDelete: null,
  onEdit: null,
  isUserPost: false,
};
export default PostCard;
