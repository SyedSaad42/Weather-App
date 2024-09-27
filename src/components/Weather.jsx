import React, { useEffect, useState ,useRef } from 'react'
import './WeatherCSS.css'
import search_icon from '../assets/search.png'
import clear_icon from '../assets/clear.png'
import cloud_icon from '../assets/cloud.png'
import drizzle_icon from '../assets/drizzle.png'
import humidity_icon from '../assets/humidity.png'
import rain_icon from '../assets/rain.png'
import snow_icon from '../assets/snow.png'
import wind_icon from '../assets/wind.png'
export default function Weather() {

  const inputRef = useRef()

  const [weatherData,setWeatherData]= useState(false)
  const allicon = {
     "01d": clear_icon,
      "01n": clear_icon,
      "02d" : cloud_icon,
      "02n" : cloud_icon,
      "03d" : cloud_icon,
      "03n" : cloud_icon,
      "04d" : drizzle_icon,
      "04n" : drizzle_icon,
      "09d" : rain_icon,
      "09n" : rain_icon,
      "10d" : rain_icon,
      "10n" : rain_icon,
      "13d" : rain_icon,
      "13n" : rain_icon
    }
  
  
  const search = async (city)=>{
    try{
      const url =`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`
    //add fetch api

    const response = await fetch(url);

    const data= await response.json();

    if(!response.ok){
      alert(data.message)
      return;
    }
    console.log(data);

    const icon = allicon[data.weather[0].icon] || clear_icon
    setWeatherData({
      humidity: data.main.humidity,
      windspeed: data.wind.speed,
      temperature: Math.floor(data.main.temp),
      location: data.name,
      icon: icon
    })
    }catch (error){
      setWeatherData(false)
      console.error("Error in fetching data")
    }
  }

useEffect(()=>{
  search("New York")
},[])

  return (
    <div className="weather">
        <div className="search-bar">
            <input ref={inputRef} type="text" placeholder="Search"/>
            <img src={search_icon} alt="searchicon" onClick={()=> search(inputRef.current.value)}/>
        </div>
        {weatherData?<>
          <img src={clear_icon} alt="" className="weather-icon"/>
        <p className="temperature">{weatherData.temperature}</p>
        <p className="location">{weatherData.location}</p>
        <div className="weather-data">
          <div className="col">
            <img src={humidity_icon} alt=""></img>
            <div>
              <p>{weatherData.humidity} %</p>
              <span>Wind Speed</span>
            </div>
          </div>
          <div className="col">
            <img src={wind_icon} alt="searchicon" />
            <div>
              <p>{weatherData.windspeed}</p>
              <span>Wind Speed</span>
            </div>
          </div>
        </div>
        </>:<></>} // if the key is wrong notthing will work 
       
    </div>
  )
}