import React from 'react';
import {Link} from "react-router-dom"

export default function Chat() {
  return <div>
      <div
        className="chatContainer"
      >
          <div
            className="chat_usersArea"
          >
              <div
                className="user"
              >Green123</div>
              <div
                className="user"
              >SammieGurl</div>
              <div
                className="user"
              >TacoTownLover</div>
          </div>

        <div
            className="chat_area"
        >
            <p>SammieGurl: hey, what's upall.</p>
            <p>TacoTownLover: I want tacos!</p>
            <p>Green123: ?!</p>

        </div>

        <div
            className="message_area"
        >
            <p>Type your message here! </p>
        </div>
      </div>
      <Link to="/"
            className= "nav_link">
                Log Out
      </Link>
  </div>;
}
