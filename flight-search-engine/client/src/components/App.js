import React , {useState, useEffect}from 'react'
import {Navbar} from './Navbar.js'
import "./App.css"


export const App = () => {
    const [data, setData] = useState([])
    async function getData() {
        const response = await fetch('http://localhost:8000')
        const payload = await response.json();
        setData(payload.results)
      }
  
      useEffect(() => {
        getData();
      }, []);
      console.log(data);
      const renderData = data.map((flight)=> {
        const {id, name, price, originCity, destinationCity, departureDate, departureTime} = flight;
        return (
                <div id='flights' key={id}>
                     <h3>{name}</h3>
                     <p> Rs. {price.toFixed(2)} </p>
                     <p>origin {originCity}</p>
                     <p>destination {destinationCity}</p>
                     <p>departureDate{departureDate}</p>
                     <p>departureTime {departureTime}</p>
                </div>
        )
      })

    return (
        <>
        <Navbar/>
        <div className='main'>
        <>{renderData}</>
        </div>
        </>
    )
}
