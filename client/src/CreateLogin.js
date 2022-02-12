import React from 'react';
import {Link} from "react-router-dom"

export default function CreateLogin() {
  return <div>
      create your login here!
      <Link to="/"
            className= "nav_link">
                Log In
      </Link>
  </div>;
}
