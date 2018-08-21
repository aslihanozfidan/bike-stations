import React, { Component } from "react";
import "./style.css";

import ProgressBar from "../../components/ProgressBar";

import axios from "axios";

class ProgressBarContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stations: []
    };
  }

  getStations = () => {
    axios
      .get(`https://api.citybik.es//v2/networks/melbourne-bike-share`)
      .then(res => {
        let allStations = [];

        if (res.data.network.stations.length > 0) {
          res.data.network.stations.forEach(station => {
            allStations.push({
              id: station.id,
              name: station.extra.name,
              totalBikes: station.empty_slots + station.free_bikes,
              existBikes: station.free_bikes
            });
          });
          console.log(allStations);
          allStations.sort();
          this.setState({ stations: allStations });
        }
      })
      .catch(function(err) {
        console.error(`${err} getStations Error`);
      });
  };

  handleCity = selectedCity => {
    this.setState({ selectedCity: selectedCity });
  };

  componentDidMount() {
    this.getStations();
  }

  render() {
    let options = [];
    this.state.stations.forEach((item, index) => {
      options.push(
        <li key={index}>
          <h2>{item.existBikes}/{item.totalBikes}</h2>
          <h3>{item.name}</h3>
        </li>
      );
    });

    let title = "All stations' status";

    return (
      <div className="container space-area-top">
        <h3 className="center-text">{title}</h3>
        <ProgressBar options={options} />
      </div>
    );
  }
}

export default ProgressBarContainer;
