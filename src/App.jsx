import React, { useEffect, useState } from "react";
import axios from "axios";
import './index.css'

function App() {
  // Set up states for weather data and the city input
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("");

  // Function to fetch weather data
  const fetchWeather = async () => {
    try {
      const apiKey = 'apikey';
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`; // Added `units=metric` to get temperature in Celsius
      const response = await axios.get(url);
      setWeather(response.data);  // Store fetched weather data in state
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };



  // Handle city input change
  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  return (
    <div className="content">
      <div className="top">
        {/* Input field for city name */}
        <input
          type="text"
          placeholder="Write a name of a city"
          className="input"
          value={city}
          onChange={handleCityChange}
        />
        <button className="search-button" onClick={fetchWeather}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16" >
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
          </svg>
        </button>
      </div>
      <div className="bottom">
        <div className="name">
          <p>Name of a city:</p>
          <p>{city}</p>
        </div>
        {/* Display weather data if available */}
        {weather ? (
          <>
            <div className="temp">
              <p>Temperature:</p>
              <p>{weather.main.temp} °C</p>
            </div>
            <div className="feels-like">
              <p>Feels like:</p>
              <p>{weather.main.feels_like} °C</p>
            </div>
            <div className="humidity">
              <p>Humidity:</p>
              <p>{weather.main.humidity}%</p>
            </div>
            <div className="sunrise">
              <p>Sunrise:</p>
              <p>{new Date(weather.sys.sunrise * 1000).toLocaleTimeString()}</p>
            </div>
            <div className="sunset">
              <p>Sunset:</p>
              <p>{new Date(weather.sys.sunset * 1000).toLocaleTimeString()}</p>
            </div>
          </>
        ) : (
          <p id="text">Enter a city and click search to see the weather</p>
        )}
      </div>
    </div>
  );
}

export default App;
