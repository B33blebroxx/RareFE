import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useRouter } from 'next/router';
import { registerUser } from '../utils/auth'; // Update with path to registerUser
import { useAuth } from '../utils/context/authContext';
import { updateRareUser } from '../api/rareUserApi';

const initialState = {
  id: '',
  firstName: '',
  lastName: '',
  bio: '',
  profileImageUrl: '',
  email: '',
  createdOn: new Date().toISOString(),
  active: true,
};
function RegisterForm({ userObj }) {
  const router = useRouter();
  const { user } = useAuth();
  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    if (userObj?.id) setFormData(userObj);
  }, [userObj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (userObj.id) {
      updateRareUser(formData).then(() => router.push(`/users/${user[0]?.id}`));
    } else {
      const payload = { ...formData, uid: user?.uid };
      registerUser(payload).then(() => router.push(`/users/${user?.id}`));
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h1>{userObj?.id ? 'Update' : 'Create'} User Profile</h1>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>First Name</Form.Label>
        <Form.Control type="text" name="firstName" value={formData.firstName} required placeholder="Enter First Name" onChange={handleChange} />
        <Form.Label>Last Name</Form.Label>
        <Form.Control type="text" name="lastName" value={formData.lastName} required placeholder="Enter Last Name" onChange={handleChange} />
        <Form.Label>Bio</Form.Label>
        <Form.Control as="textarea" name="bio" value={formData.bio} required placeholder="Enter your Bio" onChange={handleChange} />
        <Form.Label>Profile Image Url</Form.Label>
        <Form.Control type="text" name="profileImageUrl" value={formData.profileImageUrl} required placeholder="Enter URL for profile image" onChange={handleChange} />
        <Form.Label>Email Address</Form.Label>
        <Form.Control type="email" name="email" value={formData.email} required placeholder="Enter Email Address" onChange={handleChange} />
      </Form.Group>
      <Button variant="primary" type="submit">{userObj?.id ? 'Update' : 'Create'}
      </Button>
    </Form>
  );
}

RegisterForm.propTypes = {
  userObj: PropTypes.shape({
    id: PropTypes.number,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    bio: PropTypes.string,
    profileImageUrl: PropTypes.string,
    email: PropTypes.string,
    createdOn: PropTypes.string,
    active: PropTypes.bool,
    uid: PropTypes.string,
  }),
};

RegisterForm.defaultProps = {
  userObj: initialState,
};

export default RegisterForm;
