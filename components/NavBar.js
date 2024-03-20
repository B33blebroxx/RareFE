/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable @next/next/no-img-element */
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
import SearchBar from './SearchBar';

export default function NavBar() {
  const { user } = useAuth();

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Link passHref href="/">
          <Navbar.Brand>
            <img src="/RARE.png" alt="logo" className="nav-logo me-3" width="125" height="55" />
          </Navbar.Brand>
        </Link>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Link passHref href="/">
              <Nav.Link>Home</Nav.Link>
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
            <Link href={`/users/profile/${user[0]?.id}`} passHref>
              <Nav.Link>My Profile</Nav.Link>
            </Link>
          </Nav>
          <div style={{ marginLeft: '10px', paddingRight: '40px' }}>
            <SearchBar />
          </div>
          <Nav>
            <Button variant="link" onClick={signOut} style={{ paddingLeft: '50%', paddingRight: '0px' }}>
              <img src="/signout.png" alt="Sign Out" title="Sign Out" width="135" height="25" />
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
