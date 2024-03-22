/* eslint-disable import/no-unresolved */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import { Button, Card } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { getSinglePost, deletePost } from '../../api/postsApi';
import { viewSinglePostComments } from '../../api/commentsApi';
import CommentCard from '../../components/cards/CommentCard';
import { addReaction, getAllReactions, getReactionsTotals } from '../../api/reactionsApi';
import { useAuth } from '../../utils/context/authContext';
import CommentForm from '../../components/forms/CommentForm';
import AllReactionsCard from '../../components/cards/AllReactionsCard';

function ViewSinglePost() {
  const router = useRouter();
  const { user } = useAuth();
  const { id } = router.query;
  const [post, setPost] = useState({});
  const [postDetails, setPostDetails] = useState({});
  const [allReactions, setAllReactions] = useState([]);
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
    const allOfTheReactions = await getAllReactions();

    if (mountedRef.current) {
      setPost(thisPost);
      setPostDetails(details);
      setCount(reactionData);
      setCommentsSwitch(false);
      setAddOneReaction(false);
      setAllReactions(allOfTheReactions);
    }
  };

  const isUserPost = user && post.AuthorId === user.id;

  const handleEdit = () => {
    router.push(`/posts/edit/${id}`);
  };

  const handleDelete = async () => {
    const isConfirmed = window.confirm('Are you sure you want to delete this post?');
    if (isConfirmed) {
      await deletePost(id);
      router.push('/');
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

  if (!post.id) return <div>Loading...</div>;

  return (
    <>
      {commentsSwitch ? (
        <>
          <br />
          <Button
            className="m-2"
            variant="outline-secondary"
            onClick={() => {
              setCommentsSwitch(false);
            }}
          >
            Back To Post
          </Button>

          <CommentForm postObj={post} onUpdate={viewComments} />
          <h4>{post.title} Comments</h4>
          <div>
            {postDetails.comments && postDetails.comments.map((comment) => (
              <CommentCard key={comment.id} commentObj={comment} onUpdate={viewComments} />
            ))}
          </div>
        </>
      ) : (
        <div><br />
          <h2>Post Details</h2><br />
          <Card className="card-style" style={{ width: '48rem' }}>
            <Card.Img variant="top" src={post.imageUrl} />
            <Card.Body>
              <Card.Title>{post.title}</Card.Title>
              <Card.Text>By {post.author}</Card.Text>
              <Card.Text>{post.publicationDate}</Card.Text>
              <br />
              <Card.Text>{post.content}</Card.Text>
              {isUserPost && (
                <>
                  <Button
                    onClick={handleEdit}
                    id="editpost"
                    aria-label="Edit"
                    variant="secondary"
                  >
                    <img src="/editicon.png" alt="Edit post" style={{ width: '24px', height: '24px' }} />
                  </Button>
                  <Button
                    onClick={handleDelete}
                    id="deletepost"
                    aria-label="Delete"
                  >
                    <img src="/deleteicon.png" alt="Delete post" style={{ width: '24px', height: '24px' }} />
                  </Button>
                </>
              )}
              {count ? (
                <div
                  className="card-reactions"
                  style={{
                    display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px',
                  }}
                >
                  {count.reactionCounts?.map((rc) => (
                    <div key={rc.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}><br />
                      <Card.Img
                        className="cReactions"
                        variant="top"
                        src={rc.image}
                        alt={rc.label}
                        onClick={() => handleReactionClick(rc.reactionId)}
                        style={{ cursor: 'pointer', width: '30px' }}
                      />
                      <Card.Text>{rc.count}</Card.Text>
                    </div>
                  ))}
                </div>
              ) : ''}<br />
              <Button id="addreactionbtn" className="editBtn m-2" variant="outline-secondary" onClick={() => setAddOneReaction(!addOneReaction)}>
                Add Reaction
              </Button>
              {addOneReaction && (
                <div className="reactionsWrap">
                  {allReactions.map((reaction) => (
                    <AllReactionsCard key={reaction.id} reactionObj={reaction} onClick={() => handleReactionClick(reaction.id)} />
                  ))}
                </div>
              )}
              <Button id="viewcommentbtn" className="viewCommentsBtn m-2" variant="outline-secondary" onClick={viewComments}>
                View Comments
              </Button>
              <div><br />Total Reactions: {count.totalReactions}</div>
            </Card.Body>
          </Card><br /><br />
        </div>
      )}
    </>
  );
}

export default ViewSinglePost;
