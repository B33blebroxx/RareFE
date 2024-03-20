/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { Button } from 'react-bootstrap';
import { signIn } from '../utils/auth';

function Signin() {
  return (
    <div className="text-center d-flex flex-column justify-content-center align-items-center" style={{ height: '100vh', padding: '30px' }}>
      <img src="/RARE.png" alt="logo" className="nav-logo" width="280" height="130" /><br /><br />
      <Button
        variant="outline-secondary"
        type="button"
        id="signin"
        size="lg"
        className="copy-btn"
        onClick={signIn}
      >
        sign in
      </Button><br />
    </div>
  );
}

export default Signin;
