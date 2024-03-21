import React from 'react';
import { useRouter } from 'next/router';
import EditPostForm from '../../../components/forms/EditPostForm';

const EditPostPage = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div>
      <h1>Edit Post</h1>
      {id ? <EditPostForm postId={id} /> : <p>Loading...</p>}
    </div>
  );
};

export default EditPostPage;
