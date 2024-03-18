import { useRouter } from 'next/router';
import { Button, Card } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { getSingleComment } from '../../../api/commentsApi';

function ViewComment() {
  const [comment, setComment] = useState({});
  const router = useRouter();
  const { id } = router.query;

  const getTheSingleComment = () => {
    getSingleComment(id).then(setComment);
  };

  useEffect(() => {
    getTheSingleComment();
  }, [id]);

  return (
    <Card style={{ width: '18rem', margin: '15px auto' }}>
      <Card.Body>
        <Card.Title>Author Name: {comment.authorName}</Card.Title>
        <p>{comment.content}</p>
        <p>{comment.createdOn}</p>
        <Link href={`/comments/edit/${comment.id}`} passHref>
          <Button className="editBtn m-2" variant="outline-info">EDIT</Button>
        </Link>

      </Card.Body>
    </Card>

  );
}

export default ViewComment;
