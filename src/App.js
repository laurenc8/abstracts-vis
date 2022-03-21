import logo from './logo.svg';
import './App.css';
import React, { Component }  from 'react';
import { Button } from 'react-native';
import SwipePage from './vis';

  <Route exact path="/" component={SwipePage} />

function App() {
  return (
    <div className="App">
      <header className="App-header">
        //<img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
      </header>

    </div>
  );
}

export default App;
function sayHello() {
  alert('You clicked me!');
}
// Usage
<button onClick={sayHello}>Default</button>;
