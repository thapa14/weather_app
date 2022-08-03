import React from 'react'
import {iconUrlFromCode ,formatToLocalTime } from '../../Services/weatherServices'

function CityDetails(props){
  const { dt, timezone, name, country, details} = props.weather;
  return (
    <div className='d-flex flex-column justify-content-center align-items-center fade-white fs-6 city-details'>
        <p>{formatToLocalTime(dt, timezone)}</p>
        <p className='text-white fs-5 fw-normal'>{name}, {country}</p>
        <p className='mt-3 fs-6'>{details}</p>
    </div>
  )
}

export default CityDetails;