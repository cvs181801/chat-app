import React, {useContext} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Card from 'react-bootstrap/Card'
import '../index.scss';
import { ThemeContext } from '../contexts/ThemeContext';


export default function Usercard(props) {

  const theme = useContext(ThemeContext);
  console.log(theme)

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
