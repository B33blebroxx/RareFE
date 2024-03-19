/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Card } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { getSinglePost } from '../../api/postsApi';
import { viewSinglePostComments } from '../../api/commentsApi';
import CommentCard from '../../components/cards/CommentCard';
import { addReaction, getReactionsTotals } from '../../api/reactionsApi';
import CommentForm from '../../components/forms/commentForm';
import { useAuth } from '../../utils/context/authContext';

function ViewSinglePost() {
  const router = useRouter();
  const { user } = useAuth();
  const { id } = router.query;
  const [post, setPost] = useState({});
  const [postDetails, setPostDetails] = useState({});
  const [commentsSwitch, setCommentsSwitch] = useState(false);
  const [count, setCount] = useState({});
  const mountedRef = useRef(true);

  useEffect(() => () => {
    mountedRef.current = false;
  }, []);

  const getTheSinglePost = async () => {
    const thisPost = await getSinglePost(id);
    const details = await viewSinglePostComments(thisPost.id);
    const reactionData = await getReactionsTotals(thisPost.id);

    if (mountedRef.current) {
      setPost(thisPost);
      setPostDetails(details);
      setCount(reactionData);
      setCommentsSwitch(false);
    }
  };

  const incrementReaction = (reactId) => {
    const payload = {
      postId: post.id, rareUserId: user.id, reactionId: reactId,
    };
    addReaction(payload);
  };

  const viewComments = () => {
    viewSinglePostComments(post.id).then(setPostDetails);
    setCommentsSwitch(true);
  };

  useEffect(() => {
    getTheSinglePost();
  }, [id, user, post]);

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
                {count ? (
                  <Card className="card-reactions" style={{ width: '100px' }}>
                    <div>
                      {count.reactionCounts?.map((rc) => (
                        <>
                          <Card.Img variant="top" src={rc.image} alt={count?.reactionCounts?.label} onClick={() => incrementReaction(rc.reactionId)} style={{ cursor: 'pointer' }} />
                          <Card.Title>{rc.label}</Card.Title>
                          <Card.Text>{rc.count}</Card.Text>
                        </>
                      ))}
                    </div>
                  </Card>
                ) : ''}

                <Button className="editBtn m-2" variant="outline-info" onClick={viewComments}>
                  View Comments
                </Button>
                <div>Total Reactions: {count.totalReactions}</div>
              </Card.Body>
            </Card>
          </>
        </div>
      )}
    </>

  );
}

export default ViewSinglePost;