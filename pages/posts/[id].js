/* eslint-disable import/no-unresolved */
/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Card } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { getSinglePost } from '../../api/postsApi';
import { viewSinglePostComments } from '../../api/commentsApi';
import CommentCard from '../../components/cards/CommentCard';
import { addReaction, getAPostsReactions, getReactionsTotals } from '../../api/reactionsApi';
import { useAuth } from '../../utils/context/authContext';
import CommentForm from '../../components/forms/CommentForm';
import AllReactionsCard from '../../components/cards/AllReactionsCard';

function ViewSinglePost() {
  const router = useRouter();
  const { user } = useAuth();
  const { id } = router.query;
  const [post, setPost] = useState({});
  const [postDetails, setPostDetails] = useState({});
  const [reactions, setReactions] = useState([]);
  const [commentsSwitch, setCommentsSwitch] = useState(false);
  const [addOneReaction, setAddOneReaction] = useState(false);
  const [count, setCount] = useState({});
  const mountedRef = useRef(true);

  useEffect(() => () => {
    mountedRef.current = false;
  }, []);

  const getTheSinglePost = async () => {
    const thisPost = await getSinglePost(id);
    const details = await viewSinglePostComments(thisPost.id);
    const reactionData = await getReactionsTotals(thisPost.id);
    const reactionsInPost = await getAPostsReactions(thisPost.id);

    if (mountedRef.current) {
      setPost(thisPost);
      setPostDetails(details);
      setCount(reactionData);
      setCommentsSwitch(false);
      setAddOneReaction(false);
      setReactions(reactionsInPost);
    }
  };

  const incrementReaction = async (reactId) => {
    const payload = {
      postId: post.id,
      rareUserId: user[0].id,
      reactionId: reactId,
    };

    await addReaction(payload);
    const reactionData = await getReactionsTotals(post.id);
    setCount(reactionData);
    setAddOneReaction(false);
  };

  const viewComments = () => {
    viewSinglePostComments(post.id).then(setPostDetails);
    setCommentsSwitch(true);
  };

  useEffect(() => {
    if (id && user) {
      getTheSinglePost();
    }
  }, [id, user]);

  const handleReactionClick = (reactionId) => {
    incrementReaction(reactionId);
  };

  return (
    <>
      {commentsSwitch ? (
        <>
          <br />
          <Button
            className="editBtn m-2"
            variant="outline-info"
            onClick={() => {
              setCommentsSwitch(false);
            }}
          >
            Back To Post
          </Button>

          <CommentForm postObj={post} onUpdate={viewComments} />
          <h4 className="postTitle">{postDetails?.title} Comments</h4>
          <div className="commentsWrap">
            {postDetails && postDetails.comments && postDetails.comments.map((comment) => (
              <CommentCard key={comment.id} commentObj={comment} onUpdate={viewComments} />
            ))}
          </div>
        </>
      ) : (
        <div id="postdetails"><br />
          <h2>Post Details</h2><br />
          <>
            <Card className="card-style" style={{ width: '48rem' }}>
              <Card.Img variant="top" src={post.imageUrl} />
              <Card.Body>
                <h2>{post.title}</h2>
                <h3>By {post.authorDisplayName}</h3>
                <h3>{post.publicationDate}</h3>
                <br />
                <h3>{post.content}</h3>
                {count ? (
                  <div
                    className="card-reactions"
                    style={{
                      display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px',
                    }}
                  >
                    {count.reactionCounts?.map((rc) => (
                      <div key={rc.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Card.Img
                          className="cReactions"
                          style={{
                            width: '30px',
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            cursor: 'pointer',
                            gap: '10px', // Added gap between items
                            flexWrap: 'wrap', // Added to ensure space between items
                          }}
                          variant="top"
                          src={rc.image}
                          alt={rc.label}

                        />
                        <h3>{rc.count}</h3>
                      </div>
                    ))}
                  </div>

                ) : null }
                <Button className="editBtn m-2" onClick={() => setAddOneReaction(true)}>Add Reaction</Button>

                {addOneReaction ? (
                  <div className="reactionsWrap">
                    {reactions.map((reaction) => (
                      <AllReactionsCard onClick={handleReactionClick} reactionObj={reaction} key={reaction.id} />
                    ))}

                  </div>

                ) : null }

                <Button className="editBtn m-2" variant="outline-info" onClick={viewComments}>
                  View Comments
                </Button>

                <div>Total Reactions: {count.totalReactions}</div>
              </Card.Body>
            </Card>
            <br /><br />
          </>
        </div>
      )}
    </>

  );
}

export default ViewSinglePost;
