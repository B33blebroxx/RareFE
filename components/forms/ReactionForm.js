/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Form, FormGroup } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { addReaction, getAllReactions, getSingleReaction } from '../../api/reactionsApi';
import { getSinglePost } from '../../api/postsApi';

const initialState = {
  id: -1,
  image: '',
};

function ReactionForm({ reactId, postObj, onUpdate }) {
  const [reactions, setReactions] = useState([]);
  const [singleReaction, setSingleReaction] = useState({});
  const [formInput, setFormInput] = useState(initialState);
  const { user } = useAuth();

  const ReactionGroup = async () => {
    try {
      const reactionArray = await getAllReactions(); // Wait for the reactions data
      const oneReact = await getSingleReaction(reactId); // Wait for the single reaction data

      setSingleReaction(oneReact);
      setReactions(reactionArray);
    } catch (error) {
      console.error('Error fetching reactions:', error);
      // Handle error
    }
  };

  useEffect(() => {
    ReactionGroup();
  }, [postObj, user, reactId]);

  console.warn(reactions);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { reactionId: singleReaction.id, rareUserId: user[0].id, postId: postObj.id };
    addReaction(payload).then(() => {
      getSinglePost(postObj.id);
      onUpdate();
    });
  };
  console.warn(reactions);
  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Form.Select
          aria-label="Reaction"
          name="id"
          onChange={handleChange}
          className="mb-3"
          value={formInput.id}
          required
        >
          <option value="">Select a reactions</option>
          {
            reactions.map((reaction) => (
              <option
                key={reaction.id}
                value={reaction.id}
              >
                <img alt={reaction.id} src={reaction.image} />
              </option>
            ))
          }
        </Form.Select>
      </FormGroup>
      <Button type="submit">Close</Button>

    </Form>
  );
}

ReactionForm.propTypes = {
  reactId: PropTypes.number.isRequired,
  postObj: PropTypes.shape({
    id: PropTypes.number,
    rareUserId: PropTypes.number,
    title: PropTypes.string,
    publicationDate: PropTypes.string,
    imageUrl: PropTypes.string,
    content: PropTypes.string,
    approved: PropTypes.bool,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default ReactionForm;
