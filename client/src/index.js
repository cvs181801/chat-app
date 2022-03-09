import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';


import 'bootstrap/dist/css/bootstrap.css';
import {UserContext} from './contexts/UserContext'

ReactDOM.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>,
  document.getElementById('root')
  
);


