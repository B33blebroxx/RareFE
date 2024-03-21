/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import { getAllReactions } from '../api/reactionsApi';
import AllReactionsCard from './cards/AllReactionsCard';
import { getSinglePost } from '../api/postsApi';

export default function ReactionGroup({ id }) {
  const [reactions, setReactions] = useState([]);
  const [singlePost, setSinglePost] = useState({});

  const allReacts = () => {
    getAllReactions().then(setReactions);
    getSinglePost(id).then(setSinglePost);
  };

  useEffect(() => {
    allReacts();
  }, [id]);

  return (
    <>
      <br />
      <h2>Select a Reaction</h2>
      <div className="card-container">
        {reactions.map((reaction) => (
          <AllReactionsCard key={reaction.id} reactionObj={reaction} postObj={singlePost} onUpdate={allReacts} />
        ))}
      </div>
    </>
  );
}

ReactionGroup.propTypes = {
  id: PropTypes.number.isRequired, // Validate id prop as a required number
};
