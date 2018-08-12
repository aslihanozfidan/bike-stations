import React, { Component } from 'react';
import './style.css';

import Weather from '../Weather';

import axios from 'axios';

class WeatherContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ip: '',
            location: '',
            weather: '',
            degree: '',
            cityAndCountry: '',
        }
    }

    getIp = () => {
        axios.get(`https://api.ipify.org/?format=json`)
            .then(res => {
                this.setState({ ip: res.data.ip });
                this.getLocation();
            })
            .catch(function (err) {
                console.log(`${err} getIp Error`);
            })
    }

    getLocation = () => {
        axios.get(`http://api.ipstack.com/${this.state.ip}?access_key=63103dfd063101876c71fd60373b19a0`)
            .then(res => {
                let cityAndCountryData = res.data.city + ", " + res.data.country_name;

                this.setState({ cityAndCountry: cityAndCountryData });
                this.setState({ location: res.data.region_name });
                this.getWeatherData();
            })
            .catch(function (err) {
                console.log(`${err} getLocation Error`);
            })
    }

    getWeatherData = () => {
        axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${this.state.location}&APPID=2ad4bb8162ba06a16cb22f239756e81f`)
            .then(res => {
                let kelvinToCelcius = (parseFloat(res.data.main.temp) - 273).toFixed(0) + "°C";

                this.setState({ degree: kelvinToCelcius });
                this.setState({ weather: res.data.weather[0].main });
            })
            .catch(function (err) {
                console.log(`${err} getWeatherData Error`)
            })
    }

    componentDidMount() {
        this.getIp();
    }

    render() {
        let text = this.state.weather === 'Sunny' || this.state.weather === 'Clouds' ?
            "You should go out and ride a bike!" :
            "The weather's not good! :(";

        return (
            <div className="container weather-area">
                <h3 className="center-text">{text}</h3>
                <Weather weatherStatus={this.state.weather} weatherDegree={this.state.degree} />
            </div>
        );
    }
}

export default WeatherContainer;