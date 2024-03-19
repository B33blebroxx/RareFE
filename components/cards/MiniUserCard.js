import { Button, Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Link from 'next/link';

export default function MiniUserCard({ userObj }) {
  return (
    <Card id="user-card">
      <Card.Img id="user-card-img" variant="top" src={userObj.profileImageUrl} />
      <Card.Body>
        <Card.Title id="user-card-title">{`${userObj.firstName} ${userObj.lastName}`}</Card.Title>
      </Card.Body>
      <Card.Body>
        <Link href={`/users/profile/${userObj.id}`} passHref>
          <Button className="button" variant="outline-info">
            View Profile
          </Button>
        </Link>
      </Card.Body>
    </Card>
  );
}

MiniUserCard.propTypes = {
  userObj: PropTypes.shape({
    id: PropTypes.number,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    profileImageUrl: PropTypes.string,
  }).isRequired,
};
