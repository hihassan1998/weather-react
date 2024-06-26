import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&lang=en&appid=fb25d7b1399ebb4b71910b5399606a33`;

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data);
        console.log(response.data);
      });
      setLocation('');
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="app">
      <div className="search">
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder="Enter Location"
          type="text"
        />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()}°C</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].description}</p> : null}
          </div>
          <div className="sunrise-sunset">
            {data.sys ? (
              <p>
                Sunrise: {formatTimestamp(data.sys.sunrise)} | Sunset:{' '}
                {formatTimestamp(data.sys.sunset)}
              </p>
              // <p>
              //   Soluppgång: {formatTimestamp(data.sys.sunrise)} | Solnedgång:{' '}
              //   {formatTimestamp(data.sys.sunset)}
              // </p>
            ) : null}
          </div>
        </div>

        {data.name !== undefined && (
          <div className="bottom">
            <div className="feels">
              {data.main ? (
                <p className="bold">{data.main.feels_like.toFixed()}°C</p>
              ) : null}
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              {data.main ? (
                <p className="bold">{data.main.humidity}%</p>
              ) : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {data.wind ? (
                <p className="bold">{data.wind.speed.toFixed()} MPH</p>
              ) : null}
              <p>Wind Speed</p>
            </div>
            {/* <div className="pressure">
              {data.main ? (
                <p className="bold">{data.main.pressure} hPa</p>
              ) : null}
              <p>Pressure</p>
            </div> */}
            {/* <div className="visibility">
              {data.visibility ? (
                <p className="bold">{(data.visibility / 1000).toFixed(1)} km</p>
              ) : null}
              <p>Visibility</p>
            </div> */}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
