import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function NoMatch() {
  return (
    <div className="container my-5 text-center">
      <h2>Page Not Found</h2>
      <Link to="/" className="btn btn-primary mt-3">
        Go to Home
      </Link>
    </div>
  );
}
export default NoMatch;