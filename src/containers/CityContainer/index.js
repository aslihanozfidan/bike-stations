import React, { Component } from "react";
import "./style.css";

import SelectBox from "../../components/SelectBox";

import axios from "axios";

class CityContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cities: [],
      selectedCity: ""
    };
  }

  getCities = () => {
    axios
      .get(`https://api.citybik.es//v2/networks/`)
      .then(res => {
        let allCities = [];

        if (res.data.networks.length > 0) {
          res.data.networks.forEach(network => {
            allCities.push({ id: network.id, name: network.location.city });
          });

          allCities.sort();
          this.setState({ cities: allCities });
        }
      })
      .catch(function(err) {
        console.error(`${err} getNetworks Error`);
      });
  };

  handleCity = selectedCity => {
    this.setState({ selectedCity: selectedCity });
  };

  componentDidMount() {
    this.getCities();
  }

  render() {
    let options = [];
    this.state.cities.forEach((element, index) => {
      options.push(
        <option key={index} value={element.name}>
          {element.name}
        </option>
      );
    });

    let title = "Select your city...";

    return (
      <div className="container">
        <h3 className="center-text">{title}</h3>
        <SelectBox options={options} onHandleCitySelection={this.handleCity} />
      </div>
    );
  }
}

export default CityContainer;
