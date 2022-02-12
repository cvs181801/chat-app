import React from 'react';
import {Link} from "react-router-dom"

export default function Chat() {
  return <div>
      <p>chat page</p>
      <Link to="/"
            className= "nav_link">
                Log Out
      </Link>
  </div>;
}
