import React, {useState} from 'react'
import axios from 'axios'

export default function Searchfrom() {
  var [originCity, setoriginCity] = useState('')
  var [destinationCity, setdestinationCity] = useState('')
  var [departureDate, setdepartureDate] = useState('')

  const submitHandler = (event) => {
    event.preventDefault();
    axios.post('http://localhost:8000/postData',{
      originCity,
      destinationCity,
      departureDate
    })
    .then((response) => {
      console.log(response);
      setoriginCity('')
      setdestinationCity('')
      setdepartureDate('')
    })
    .catch((error) => console.log(error));
  }
  return (
    <div  className="form-group" id='myform' onSubmit={submitHandler}>
        <form>
            <input type="text" className="form-control" style={{width: "300px", margin:"15px"}} placeholder='Enter origin city'value={originCity} onChange={(event) => setoriginCity(event.target.value)}/>
            <input type="text" className="form-control"  style={{width: "300px",  margin:"15px"}} placeholder='Enter destination city' value={destinationCity} onChange={(event) => setdestinationCity(event.target.value)}/>
            <input type="date" className="form-control"style={{width: "300px",  margin:"15px"}} value={departureDate} onChange={(event) => setdepartureDate(event.target.value)}/>
            <button type="submit" className="btn btn-primary" style={{width: "300px",  margin:"15px"}} >Submit</button>
        </form>
    </div>
  )
}