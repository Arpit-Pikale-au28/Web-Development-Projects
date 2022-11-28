import React, {useState} from 'react'
import axios from 'axios'
import '../App.css'

export default function Searchfrom() {
  var [originCity, setoriginCity] = useState('')
  var [destinationCity, setdestinationCity] = useState('')
  var [departureDate, setdepartureDate] = useState('')
  var [data, setData] = useState([])

    const submitHandler = (event) => {
    event.preventDefault();
    axios.post('http://localhost:8000/postData',{
      originCity,
      destinationCity,
      departureDate
    })
    .then((response) => {
      console.log(response);
      setData(response.data)
      if(response.data)
      setoriginCity('')
      setdestinationCity('')
      setdepartureDate('')
    })
    .catch((error) => console.log(error));
  }

  return (
    <>
    <div  className="form-group" id='myform' onSubmit={submitHandler}>
        <form>
            <input type="text" className="form-control" style={{width: "300px", margin:"15px"}} placeholder='Enter origin city' required value={originCity} onChange={(event) => setoriginCity(event.target.value)}/>
            <input type="text" className="form-control"  style={{width: "300px",  margin:"15px"}} placeholder='Enter destination city' required value={destinationCity} onChange={(event) => setdestinationCity(event.target.value)}/>
            <input type="date" className="form-control"style={{width: "300px",  margin:"15px"}} value={departureDate} required onChange={(event) => setdepartureDate(event.target.value)}/>
            <button type="submit" className="btn btn-primary" style={{width: "300px",  margin:"15px"}} >Submit</button>
        </form>
    </div>
      {data.map((flight)=> {
           const {id, name, price, originCity, destinationCity, departureDate, departureTime} = flight;
            return (
              <div id='flights' key={id}>
                    <h3>&#x20b9; {price.toFixed(2)}</h3>
                    <h4>{originCity} {'<'}----------{'>'} {destinationCity}</h4>
                    <h5>{departureDate}</h5>
                    <h5>{departureTime}</h5>
                    <div id='img'>
                      <img src="https://images.cnbctv18.com/wp-content/uploads/2018/04/AIR-INDIA-REUTERS.jpg?im=FitAndFill,width=1200,height=900" alt={name}/>
                      <h4> {name} </h4>
                      </div>
                    
              </div>
              )
        })
      }
     
  </>
    
  )
}