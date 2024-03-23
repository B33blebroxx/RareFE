/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleComment, viewSinglePostComments } from '../../../api/commentsApi';
import CommentCard from '../../../components/cards/CommentCard';
import CommentForm from '../../../components/forms/CommentForm';

export default function EditComment() {
  const [editComment, setEditComment] = useState({});
  const [postDetails, setPostDetails] = useState({});
  const router = useRouter();
  const { id } = router.query;

  const getCPObjects = async () => {
    const thisComment = await getSingleComment(id);
    const thisPostObjCom = await viewSinglePostComments(thisComment.postId);
    setPostDetails(thisPostObjCom);
    setEditComment(thisComment);
  };

  useEffect(() => {
    getCPObjects();
  }, [id]);
  console.warn(postDetails);
  return (
    <>
      <CommentForm commentObj={editComment} postObj={postDetails} onUpdate={getCPObjects} />
      <div style={{ textAlign: 'center' }}>
        <div id="comment-title">
          <h4 style={{ fontStyle: 'italic' }}>{postDetails.title}</h4><h5 style={{ color: '#E5E5E5' }}> Comments:</h5>
          <div className="commentsWrap">
            {postDetails && postDetails.comments && postDetails.comments.map((comment) => (
              <CommentCard key={comment.id} commentObj={comment} onUpdate={getCPObjects} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
