import { Button, Card, ListGroup } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { useAuth } from '../../utils/context/authContext';

export default function UserCard({ userObj }) {
  const { user } = useAuth();
  const isCurrentUserProfile = user[0].uid === userObj.uid;

  return (
    <Card id="user-card">
      <Card.Img id="user-card-img" variant="top" src={userObj.profileImageUrl} />
      <Card.Body>
        <Card.Title id="user-card-title">{`${userObj.firstName} ${userObj.lastName}`}</Card.Title>
        <Card.Text>Bio: {userObj.bio}</Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>Email: {userObj.email}</ListGroup.Item>
        <ListGroup.Item>Created On : {userObj.createdOn}</ListGroup.Item>
      </ListGroup>
      <Card.Body>
        {' '}
        {isCurrentUserProfile && (
          <Link href={`/users/${userObj.id}`} passHref>
            <Button className="button" variant="info">
              Edit Profile
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
