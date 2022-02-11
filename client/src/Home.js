import React from 'react';

export default function Home() {
  return <div>
            <div className="container">
                <h1
                    className="title"
                >Hey. Let's Chat.</h1>
                <p>Please Login</p>
                <input
                      type="text"     
                      placeholder="username"
                      //value={inputValue}
                      //onChange={event=>setInputValue(event.target.value)}> 
                ></input>
                <input
                    type="password"     
                    placeholder="username"
                ></input>

            </div>

         </div>;
}
