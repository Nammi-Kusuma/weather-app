import { useState } from 'react';
import SearchBox from './SearchBox'
import Box from './Box'
import '../css/WeatherApp.css'

export default function WeatherApp() {
    const [weatherInfo, setWeatherInfo] = useState({
        city: "Delhi",
        temp: 25.02,
        tempMin: 25.02,
        tempMax: 25.02,
        humidity: 47,
        feelsLike: 24.84,
        weather: "haze"
    });

    let updateWeather = (newInfo) => {
        setWeatherInfo(newInfo);
    }

    return (
        <div>
            <h1>Weather App</h1>
            <SearchBox updateWeather={updateWeather}/>
            <Box info={weatherInfo}/>
        </div>
    )
}