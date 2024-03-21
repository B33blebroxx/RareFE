import { Button, Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Link from 'next/link';

export default function MiniUserCard({ userObj }) {
  return (
    <Card id="mini-user-card">
      <Card.Img variant="top" src={userObj.profileImageUrl} alt="User profile picture" />
      <Card.Body>
        <Card.Title>{`${userObj.firstName} ${userObj.lastName}`}</Card.Title>
      </Card.Body>
      <Card.Footer>
        <Link href={`/users/profile/${userObj.id}`} passHref>
          <Button id="viewuser" aria-label="View" variant="secondary">
            <img src="/viewicon.png" alt="view" title="view" style={{ width: '24px', height: '24px' }} />
          </Button>
        </Link>
      </Card.Footer>
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
