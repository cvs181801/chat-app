import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Card from 'react-bootstrap/Card'

export default function Usercard(props) {
    console.log(props)
  return <div>
      <Card>
        {props.username}
      </Card>
  </div>;
}
