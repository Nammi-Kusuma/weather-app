import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import '../css/SearchBox.css'

export default function SearchBox({ updateWeather }) {
    let [city, setCity] = useState("");
    let [error, setError] = useState(false);
    const URL = "https://api.openweathermap.org/data/2.5/weather";
    const API_KEY = "bd4377a3ee938ae7ca09f983ef201709";

    let getWeatherInfo = async () => {
        try {
            let response = await fetch(`${URL}?q=${city}&appid=${API_KEY}&units=metric`);
            let jsonResponse = await response.json();

            let result = {
                city: city,
                temp: jsonResponse.main.temp,
                tempMin: jsonResponse.main.temp_min,
                tempMax: jsonResponse.main.temp_max,
                humidity: jsonResponse.main.humidity,
                feelsLike: jsonResponse.main.feels_like,
                weather: jsonResponse.weather[0].description
            }
            // console.log(result);
            return result;
        } catch (err) {
            throw err;
        }
    }

    let handleInput = (event) => {
        setCity(event.target.value);
    }

    let handleSubmit = async (event) => {
        try {
            event.preventDefault();
            setCity("");
            let newInfo = await getWeatherInfo();
            updateWeather(newInfo);
        } catch (err) {
            setError(true);
        }
    }

    return (
        <div className='SearchBox'>
            <form onSubmit={handleSubmit}>
                <TextField id="city" label="City Name" variant="outlined" value={city} onChange={handleInput} required />
                <br /><br />
                <Button variant="contained" type="submit">Search</Button>
                {error && <p style={{color: "red"}}>No such place exists in our API!!</p>}
            </form>
        </div>
    )
}