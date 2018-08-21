import React, { Component } from "react";
import "./style.css";

class ProgressBar extends Component {
  render() {
    return (
      <div className="progress-bar">
        <ul>{this.props.options}</ul>
      </div>
    );
  }
}

export default ProgressBar;
