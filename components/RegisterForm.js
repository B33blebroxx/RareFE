import PropTypes from 'prop-types';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { registerUser } from '../utils/auth'; // Update with path to registerUser
import { useAuth } from '../utils/context/authContext';

function RegisterForm() {
  const { user, updateUser } = useAuth();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    bio: '',
    profileImageUrl: '',
    email: '',
    createdOn: new Date().toISOString(),
    active: true,
    uid: user.fbUser.uid,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    registerUser(formData).then(() => updateUser(user.fbUser.uid));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>First Name</Form.Label>
        <Form.Control type="text" name="FirstName" required placeholder="Enter First Name" onChange={handleChange} />
        <Form.Label>Last Name</Form.Label>
        <Form.Control type="text" name="LastName" required placeholder="Enter Last Name" onChange={handleChange} />
        <Form.Label>Bio</Form.Label>
        <Form.Control as="textarea" name="Bio" required placeholder="Enter your Bio" onChange={handleChange} />
        <Form.Label>Profile Image Url</Form.Label>
        <Form.Control type="text" name="ProfileImageUrl" required placeholder="Enter URL for profile image" onChange={handleChange} />
        <Form.Label>Email Address</Form.Label>
        <Form.Control type="email" name="Email" required placeholder="Enter Email Address" onChange={handleChange} />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

RegisterForm.propTypes = {
  user: PropTypes.shape({
    fbUser: PropTypes.shape({
      id: PropTypes.number,
      uid: PropTypes.string.isRequired,
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      bio: PropTypes.string,
      profileImageUrl: PropTypes.string,
      email: PropTypes.string,
      createdOn: PropTypes.instanceOf(Date),
      active: PropTypes.bool,
    }).isRequired,
  }).isRequired,
};

export default RegisterForm;
