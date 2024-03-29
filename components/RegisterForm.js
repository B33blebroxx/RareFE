/* eslint-disable @next/next/no-img-element */
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useRouter } from 'next/router';
import { registerUser } from '../utils/auth'; // Update with path to registerUser
import { useAuth } from '../utils/context/authContext';
import { updateRareUser } from '../api/rareUserApi';

function RegisterForm({ userObj }) {
  const router = useRouter();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    firstName: userObj.firstName || '',
    lastName: userObj.lastName || '',
    bio: userObj.bio || '',
    profileImageUrl: userObj.profileImageUrl || '',
    email: userObj.email || '',
    createdOn: userObj.createdOn ? new Date(userObj.createdOn).toISOString() : new Date().toISOString(),
    active: userObj.active !== undefined ? userObj.active : true,
  });

  useEffect(() => {
    if (userObj?.id) {
      setFormData({
        ...userObj,
        createdOn: userObj.createdOn ? new Date(userObj.createdOn).toISOString() : new Date().toISOString(),
      });
    }
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
    const filteredFormData = { ...formData };
    if (!filteredFormData.id) {
      delete filteredFormData.id;
    } else {
      filteredFormData.id = parseInt(filteredFormData.id, 10);
    }

    if (userObj.id) {
      updateRareUser(filteredFormData).then(() => router.push(`/users/profile/${userObj?.id}`));
    } else {
      const payload = { ...filteredFormData, uid: user?.uid };
      registerUser(payload).then((response) => {
        router.push(`/users/profile/${response.id}`);
      });
    }
  };

  return (
    <div id="regform-container">
      <Form onSubmit={handleSubmit} className="regForm">
        <br /><br />
        <h1>{userObj?.id ? 'Update' : 'Create'} User Profile</h1><br />
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
        <Button
          id="userbtn"
          className="profileBtn m-2"
          variant="outline-secondary"
          type="submit"
        >{userObj?.id ? 'Update' : 'Create'}
        </Button>
      </Form>
    </div>
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
  userObj: {},
};

export default RegisterForm;
