/* eslint-disable @next/next/no-img-element */
import { Button, Card, ListGroup } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { useAuth } from '../../utils/context/authContext';

export default function UserCard({ userObj }) {
  const { user } = useAuth();
  const isCurrentUserProfile = user.uid === userObj.uid;

  return (
    <Card className="card-style" style={{ width: '48rem' }}>
      <Card.Img variant="top" src={userObj.profileImageUrl} />
      <Card.Body>
        <Card.Title>{`${userObj.firstName} ${userObj.lastName}`}</Card.Title>
        <Card.Text>Bio: {userObj.bio}</Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item className="list-group">Email: {userObj.email}</ListGroup.Item>
        <ListGroup.Item className="list-group">Created On : {userObj.createdOn}</ListGroup.Item>
      </ListGroup>
      <Card.Body>
        {' '}
        {isCurrentUserProfile && (
          <Link href={`/users/${userObj.id}`} passHref>
            <Button id="edituser" aria-label="Edit" variant="outline-info">
              <img src="/editicon.png" alt="Edit" title="Edit" style={{ width: '24px', height: '24px' }} />
            </Button>
          </Link>
        )}{' '}
      </Card.Body>
    </Card>
  );
}

UserCard.propTypes = {
  userObj: PropTypes.shape({
    id: PropTypes.number,
    uid: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    profileImageUrl: PropTypes.string,
    bio: PropTypes.string,
    email: PropTypes.string,
    createdOn: PropTypes.string,
  }).isRequired,
};
