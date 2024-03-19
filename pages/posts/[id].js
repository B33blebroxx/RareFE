/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Card } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getSinglePost } from '../../api/postsApi';
import { viewSinglePostComments } from '../../api/commentsApi';
import CommentCard from '../../components/cards/CommentCard';
import CommentForm from '../../components/forms/commentForm';

function ViewSinglePost() {
  const router = useRouter();
  const { id } = router.query;
  const [post, setPost] = useState({});
  const [postDetails, setPostDetails] = useState({});
  const [commentsSwitch, setCommentsSwitch] = useState(false);

  const getTheSinglePost = () => {
    getSinglePost(id)?.then(setPost);
    setCommentsSwitch(false);
  };

  const viewComments = () => {
    viewSinglePostComments(post.id).then(setPostDetails);
    setCommentsSwitch(true);
  };

  useEffect(() => {
    getTheSinglePost();
  }, [id]);

  return (
    <>
      {commentsSwitch ? (
        <>
          <Button className="editBtn m-2" variant="outline-info" onClick={getTheSinglePost}>
            Back To Post
          </Button>
          <CommentForm postObj={post} onUpdate={viewComments} />
          <h2 className="postTitle">{postDetails?.title} Comments</h2>
          <div className="commentsWrap">
            {postDetails && postDetails.comments && postDetails.comments.map((comment) => (
              <CommentCard key={comment.id} commentObj={comment} onUpdate={viewComments} />
            ))}
          </div>
        </>
      ) : (
        <div>
          <h1>Post Details</h1>
          <>
            <Card className="card-style" style={{ width: '48rem' }}>
              <Card.Img variant="top" src={post.imageUrl} />
              <Card.Body>
                <Card.Title>{post.title}</Card.Title>
                <Card.Text>By {post.authorDisplayName}</Card.Text>
                <Card.Text>{post.publicationDate}</Card.Text>
                <br />
                <Card.Text>{post.content}</Card.Text>
                <Button className="editBtn m-2" variant="outline-info" onClick={viewComments}>
                  View Comments
                </Button>
              </Card.Body>
            </Card>
          </>
        </div>
      )}
    </>

  );
}

export default ViewSinglePost;
