/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Card } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getSinglePost } from '../../api/postsApi';
import { viewSinglePostComments } from '../../api/commentsApi';
import CommentCard from '../../components/cards/CommentCard';
import { addReaction, getAPostsReactions, getReactionsTotals } from '../../api/reactionsApi';
import CommentForm from '../../components/forms/commentForm';
import ReactionCard from '../../components/cards/ReactionCard';
import { useAuth } from '../../utils/context/authContext';

function ViewSinglePost() {
  const router = useRouter();
  const { user } = useAuth;
  const { id } = router.query;
  const [post, setPost] = useState({});
  const [postDetails, setPostDetails] = useState({});
  const [commentsSwitch, setCommentsSwitch] = useState(false);
  const [count, setCount] = useState(-1);
  const [pReactions, setPReactions] = useState([]);
  const [groupedReactions, setGroupedReactions] = useState([]);

  useEffect(() => {
    const groupReactions = () => {
      const groups = pReactions.reduce((accumulator, reaction) => {
        if (!accumulator[reaction.label]) {
          accumulator[reaction.label] = {
            label: reaction.label,
            image: reaction.image,
            count: 0,
          };
        }
        accumulator[reaction.label].count += reaction.count;
        return accumulator;
      }, {});
      return Object.values(groups);
    };

    // Update the grouped reactions state
    setGroupedReactions(groupReactions());
  }, [pReactions]); // Run this effect whenever pReactions changes
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
  const incrementReaction = async () => {
    const payload = {
      postId: post.id, rareUserId: user[0]?.id, reactionId: pReactions?.reaction?.id,
    };
    await addReaction(payload);
    // Update the reaction count locally
    const updatedReactions = pReactions.map((reaction) => {
      if (reaction.id === payload.reactionId) {
        return { ...reaction, count: reaction.count + 1 };
      }
      return reaction;
    });
    setPReactions(updatedReactions);
  };

  useEffect(() => {
    getTheSinglePost();
  }, [id, user]);

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
                {groupedReactions.map((reactionGroup) => (
                  <div className="reactionWrap" key={reactionGroup.label}>
                    <div className="reaction-images-container">
                      <ReactionCard
                        key={reactionGroup.label}
                        reactionObj={{ label: reactionGroup.label, image: reactionGroup.imageUrl, count: reactionGroup.count }}
                        incrementReaction={incrementReaction}
                      />
                    </div>
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
