import React from 'react';
import './Forecast.css';
import { iconUrlFromCode } from '../../Services/weatherServices';

function Forecast(props) {
    const { weather,timing } = props
    // console.log(props.weather);
    return (
        <div className="d-flex flex-column  forecast my-4">
            <span className='fs-10 text-uppercase text-white '>{timing} Forecast</span>
            <div className='line bg-fade-white my-1' ></div>
            <div className="d-flex flex-row justify-content-between f-table">
                {
                    weather.map((value, index) => {
                        const {title, icon, temp} = value;
                        return (
                            <div key={index}>
                                <div className="d-flex flex-column justify-content-center table-col">
                                    <span className='fade-white fs-9 mt-1 text-center'>{title}</span>
                                    <img src={iconUrlFromCode(icon)} alt="icon" style={{ width: 50 }} />
                                    <span className='text-white align-self-center fs-9'>{temp.toFixed()}°</span>
                                </div>
                            </div>
                        )
                    })
                }

            </div>

        </div>
    )
}

export default Forecast