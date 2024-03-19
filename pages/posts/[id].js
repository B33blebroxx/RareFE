import { Button, Card } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getSinglePost } from '../../api/postsApi';
import { viewSinglePostComments } from '../../api/commentsApi';
import CommentCard from '../../components/cards/CommentCard';
import { getAPostsReactions, getReactionsTotals } from '../../api/reactionsApi';
import CommentForm from '../../components/forms/commentForm';

function ViewSinglePost() {
  const router = useRouter();
  const { id } = router.query;
  const [post, setPost] = useState({});
  const [postDetails, setPostDetails] = useState({});
  const [commentsSwitch, setCommentsSwitch] = useState(false);
  const [count, setCount] = useState(-1);
  const [pReactions, setPReactions] = useState([]);

  const getTheSinglePost = async () => {
    const thisPost = await getSinglePost(id);
    const details = await viewSinglePostComments(thisPost.id);
    const postReactions = await getAPostsReactions(thisPost.id);
    const reactionData = await getReactionsTotals(thisPost.id);

    setPost(thisPost);
    setPostDetails(details);
    setPReactions(postReactions);
    setCount(reactionData);
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
                {pReactions.map((reaction) => (
                  <div key={reaction.lable}>
                    <image src={reaction.imageUrl} alt={reaction.label} style={{ width: '30px', height: '30px', marginRight: '5px' }} />
                    {reaction.label}: {reaction.count}
                  </div>
                ))}
                <Button className="editBtn m-2" variant="outline-info" onClick={viewComments}>
                  View Comments
                </Button>
                <div>Total Reactions: {count}</div>
              </Card.Body>
            </Card>
          </>
        </div>
      )}
    </>

  );
}

export default ViewSinglePost;
