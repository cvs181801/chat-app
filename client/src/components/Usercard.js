import React, {useState, useContext} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Card from 'react-bootstrap/Card'
import '../index.scss';

export default function Usercard(props) {

  return <div>
      <Card
        className="usercard_title"
        style={{backgroundColor: props.theme === "light" ? "#fadfbb" : "#3902ff",
                color: props.theme === "light" ? "#313131" : "#fadfbb"
              }}
      >
        {props.username}
      </Card>
  </div>;
}
