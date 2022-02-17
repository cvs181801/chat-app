import React from 'react';
import {Link} from "react-router-dom"

export default function CreateLogin() {
  return <div>
    <form>
       <label>Choose a screen name:</label><input type="text"></input>  
       <label>Login username:</label><input type="text"></input>  
       <label>Password</label><input type="password"></input>  
       
    </form>
      <Link to="/"
            className= "nav_link">
                Log In
      </Link>
  </div>;
}
//create mock 'create your login' functionality
//draft up tables