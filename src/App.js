import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import WeatherComponent from './containers/WeatherContainer';
import CityContainer from './containers/CityContainer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
        </header>
        <WeatherComponent />        
        <CityContainer />
      </div>
    );
  }
}

export default App;
