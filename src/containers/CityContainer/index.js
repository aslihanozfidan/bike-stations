import React, { Component } from "react";
import "./style.css";

import SelectBox from "../../components/SelectBox";
import Store from "../../store/store";

import axios from "axios";

class CityContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cities: [],
      selectedCityId: ""
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

  handleCity = selectedCityId => {
    this.setState({ selectedCityId: selectedCityId });
    Store.selectedCityId = selectedCityId;
    console.log(Store);
  };

  componentDidMount() {
    this.getCities();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if(prevState.selectedCityId !== Store.selectedCityId) {
      console.log(Store.selectedCityId + ' did update')
    }
  }

  render() {
    let options = [];
    this.state.cities.forEach((element, index) => {
      options.push(
        <option key={index} value={element.id}>
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
