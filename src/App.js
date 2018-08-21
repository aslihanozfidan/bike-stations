import React, { Component } from 'react';
import './App.css';
import WeatherComponent from './containers/WeatherContainer';
import CityContainer from './containers/CityContainer';
import ProgressBarContainer from './containers/ProgressBarContainer';

class App extends Component {
  render() {
    return (
      <div className="app">
        <WeatherComponent />        
        <CityContainer />
        <ProgressBarContainer /> 
      </div>
    );
  }
}

export default App;
