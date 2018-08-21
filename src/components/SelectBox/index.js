import React, { Component } from "react";
import "./style.css";

class SelectBox extends Component {
  handleCitySelection = (e) => {
    let city = e.target.value;
    this.props.onHandleCitySelection(city);
    console.log(city);
  }

  render() {
    return (
      <div className="select-box">
        <select onChange={this.handleCitySelection}>{this.props.options}</select>
      </div>
    );
  }
}

export default SelectBox;
