import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getSingleUser } from '../../../api/rareUserApi';
import { getUsersPosts } from '../../../api/postsApi';
import UserCard from '../../../components/cards/UserCard';
// import { useAuth } from '../../../utils/context/authContext';
// import Link from 'next/link';
// import { Button } from 'react-bootstrap';
import PostCard from '../../../components/cards/postCard';

export default function ViewUserProfileAndPosts() {
  const [userProfile, setUserProfile] = useState({});
  const [userPosts, setUserPosts] = useState([]);
  // const { user } = useAuth();
  const router = useRouter();
  const { id } = router.query;
  // const isCurrentUserProfile = user.uid === userProfile.uid;
  const getPosts = () => {
    getUsersPosts(id).then(setUserPosts);
  };

  useEffect(() => {
    getSingleUser(id).then(setUserProfile);
    getPosts(id);
  }, [userProfile.id]);

  return (
    <>
      <div id="user-profile-view-container">
        <UserCard userObj={userProfile} onUpdate={setUserProfile} />
      </div>
      <hr
        style={{
          backgroundColor: 'black',
          color: 'black',
          borderColor: 'black',
          height: '1px',
        }}
      />
      {/* <div id="create-post-btn">{isCurrentUserProfile && (
      <Link passHref href={`/posts/new/${firebaseKey}`}>
        <Button variant="outline-primary">Create Post</Button>
      </Link>
      )}
      </div> */}
      <div id="post-view-container">
        {userPosts.map((post) => (
          <PostCard key={post.id} postObj={post} onUpdate={getPosts} />
        ))}
      </div>
    </>
  );
}
