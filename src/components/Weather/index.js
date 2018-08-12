import React from 'react';
import './style.css';

const Weather = props => {
    let icon = props.weatherStatus !== "" ?
        <img src={require(`../../images/weather/${props.weatherStatus.toLocaleLowerCase()}.svg`)}
            className={`weather-icon-${props.weatherStatus.toLocaleLowerCase()}`}
            alt={props.weatherStatus} /> :
        <img src={require(`../../images/loading.gif`)} className="loading-icon" alt={props.weatherStatus} />;

    return (
        <div className="weather">
            {icon}
            <div className="degree">
                {props.weatherDegree}
            </div>
        </div>);
}

export default Weather;
