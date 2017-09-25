import React, { Component } from 'react';
import logo from '../images/logo.svg';
import './App.css';
import Viewport from "./Viewport";

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to Reactangles</h2>
        </div>
        <Viewport />
      </div>
    );
  }
}

export default App;
