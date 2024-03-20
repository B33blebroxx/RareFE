/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import {
  Navbar, //
  Container,
  Nav,
  Button,
} from 'react-bootstrap';
import { signOut } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';

export default function NavBar() {
  const { user } = useAuth();

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Link passHref href="/">
          <Navbar.Brand>RARE BOOKS</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Link passHref href="/">
              <Nav.Link>Home</Nav.Link>
            </Link>
            <Link passHref href="/homepage">
              <Nav.Link>Sub Posts - Homepage</Nav.Link>
            </Link>
            <Link passHref href="/posts/myPosts">
              <Nav.Link>My Posts</Nav.Link>
            </Link>
            <Link passHref href="/posts/allPosts">
              <Nav.Link>Posts</Nav.Link>
            </Link>
            <Link passHref href="/users">
              <Nav.Link>Users</Nav.Link>
            </Link>
            <Link href={`../users/profile/${user[0]?.id}`} passHref>
              <Nav.Link>My Profile</Nav.Link>
            </Link>
            <Button variant="outline-secondary" onClick={signOut}>
              Sign Out
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
