// src/Home.js
import React from 'react';
import"./App.css";

function Cover() {
  return (
      <div>
        <header>
          <h1>MPT Fitness App</h1>
        </header>
        <div>
          <input
            tabIndex="1"
            type="button"
            id="signup"
            onClick={() => window.location.href = './signup/signup.html'}
            value="Sign Up"
          />
        </div>
        <div>
          <input
            tabIndex="2"
            type="button"
            id="login"
            onClick={() => window.location.href = './login/login.html'}
            value="Login"
          />
        </div>
      </div>
  );
}

export default Cover;
