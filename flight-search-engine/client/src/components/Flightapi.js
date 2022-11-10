import React , {useState, useEffect}from 'react'
import {Navbar} from './Navbar.js'
import "./App.css"
import Searchfrom from './Searchfrom.js'


export const Flightapi = () => {
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
                     <h3>Price &#x20b9; {price.toFixed(2)}</h3>
                     <p>  </p>
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
        <Searchfrom/>
        <div className='main'>
        <>{renderData}</>
        </div>
        </>
    )
}
