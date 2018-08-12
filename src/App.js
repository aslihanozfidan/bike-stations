import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import WeatherComponent from './components/WeatherContainer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
        </header>
        <p className="App-intro">
          <WeatherComponent />
        </p>
      </div>
    );
  }
}

export default App;
