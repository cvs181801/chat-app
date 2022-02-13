import React from 'react';

export default function Usercard(props) {
    console.log(props)
  return <div>
      <div>
        {props.username}
      </div>
  </div>;
}
