import React, {useState, useContext} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Card from 'react-bootstrap/Card'
import '../index.scss';
//import { ThemeContext } from '../contexts/ThemeContext';


export default function Usercard(props) {

  //const theme = useContext(ThemeContext);
  //const theme = useState(props.theme)
  console.log(props.theme)

  return <div>
      <Card
        className="usercard_title"
        style={{backgroundColor: props.theme === "light" ? "#fadfbb" : "#3902ff",
                color: props.theme === "light" ? "#313131" : "white"
              }}
      >
        {props.username}
      </Card>
  </div>;
}
