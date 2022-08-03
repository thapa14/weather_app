import React from 'react';
import "./Cities.css";

const Cities = (props) => {
  let cities = [
    {
      city: 'London',
      id: 1
    },
    {
      city: 'Mumbai',
      id: 2
    },
    {
      city: 'Tokyo',
      id: 3
    },
    {
      city: 'New York',
      id: 4
    },
    {
      city: 'Sydney',
      id: 5
    }
  ];
  return (
    <>
      <div className='d-flex dlex-row justify-content-between text-light fw-normal fs-10 pt-3'>

        {
          cities.map((value , index) => {
            return <span className='top-cities'  key={index} onClick={() => {props.search({q:value["city"]})}}> { value["city"] } </span>
          })
        }
      </div>
    </>
  )
}

export default Cities