import React, { useState } from 'react';
import '../App.css';

const Weather=()=>{
    const [cityInput, setCityInput] = useState('');
    const [WeatherData,setWeatherData] = useState();

    const convertTemp=(valNum)=>{
        valNum = parseFloat(valNum);
        const celsius = valNum - 273.15;
        return celsius.toFixed(2);
      }

    const handleChangeEvent=(event)=>{
        setCityInput(event.target.value);
    };

    const handleClick=()=>{
       const API_key = '267e23f8b44341e56b1fe84f7cd3a6f6';
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${API_key}`)
        .then((response)=>response.json())
        .then((data)=>{
            console.log(data);

            const name = data.name;
            const country = data.sys.country;
            const temperature = data.main.temp;
            const celsiusSymbol = '\u00B0C';
            const humidity = data.main.humidity;
            const coordinates = data.coord;
            const description = data.weather[0].description;
            const icon = data.weather[0].icon;
            const convertTemperature = convertTemp(temperature);

            setWeatherData({
                name,
                country,
                humidity,
                coordinates,
                description,
                icon,
                temperature:convertTemperature,
                celsiusSymbol,
            });
        });
        

    };
    return(
        <div className='Container'>
            <input 
            type='search' 
            className='input'
            placeholder='Enter Your City Name' 
            value={cityInput} 
            onChange={handleChangeEvent} >

            </input>

            <button className='btn'type='button' onClick={handleClick}>Submit</button>
           
            {WeatherData && (
                
        <div className="data">
          <div className="name">Name: {WeatherData.name}<br></br>Country:{WeatherData.country}</div>
          <div className="temperature">Temperature: {WeatherData.temperature}{WeatherData.celsiusSymbol}<br></br>Humidity:{WeatherData.humidity}%</div>
          <div className='coord'>Latitude:{WeatherData.coordinates.lat}<br></br>Longitude:{WeatherData.coordinates.lon}<br></br>Description:{WeatherData.description}</div>
          <img className='image' src={`https://openweathermap.org/img/w/${WeatherData.icon}.png`} alt=''/>

          
          
        </div>
            )}

        </div>
    )
}
export default Weather;
