/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleComment, viewSinglePostComments } from '../../../api/commentsApi';
import CommentForm from '../../../components/forms/CommentForm';
import CommentCard from '../../../components/cards/CommentCard';

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
      <h2 className="postTitle">{postDetails?.title} Comments</h2>
      <div className="commentsWrap">
        {postDetails && postDetails.comments && postDetails.comments.map((comment) => (
          <CommentCard key={comment.id} commentObj={comment} onUpdate={getCPObjects} />
        ))}
      </div>
    </>
  );
}
