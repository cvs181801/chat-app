import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Card from 'react-bootstrap/Card'
import '../index.scss';

export default function Usercard(props) {
    console.log(props)
  return <div>
      <Card
        className="usercard_title"
        style={{backgroundColor:"#fadfbb"}}
      >
        {props.username}
      </Card>
  </div>;
}
