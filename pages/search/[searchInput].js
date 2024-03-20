import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import searchPostsByTitle from '../../api/searchApi';
import PostCard from '../../components/cards/postCard';

export default function Search() {
  const [filteredPosts, setFilteredPosts] = useState([]);
  const router = useRouter();
  const { searchInput } = router.query;

  const searchAllPosts = () => {
    searchPostsByTitle(searchInput).then(setFilteredPosts);
  };

  useEffect(() => {
    searchAllPosts();
    return () => {
      setFilteredPosts([]);
    };
  }, [searchInput]);

  return (
    <>
      <div id="search-results" className="d-flex flex-wrap">
        {filteredPosts.map((post) => <PostCard key={post.id} postObj={post} onUpdate={searchPostsByTitle} />)}
      </div>
    </>
  );
}
