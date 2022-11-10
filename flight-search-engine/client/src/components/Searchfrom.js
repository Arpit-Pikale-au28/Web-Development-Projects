import React, {useState} from 'react'
import axios from 'axios'

export default function Searchfrom() {
  const [origincity, setoriginCity] = useState('')
  const [destinationCity, setdestinationCity] = useState('')
  const [departureDate, setdepartureDate] = useState('')

  const submitHandler = (event) => {
    event.preventDefault();
    axios.post('http://localhost:8000/postData',{
      origincity,
      destinationCity,
      departureDate
    })
    .then((response) => console.log(response))
    .catch((error) => console.log(error));
  }
  return (
    <div  className="form-group">
        <form>
            <input type="text" className="form-control" style={{width: "300px", margin:"15px"}} placeholder='Enter origin city'value={origincity} onChange={(event) => setoriginCity(event.target.value)}/>
            <input type="text" className="form-control"  style={{width: "300px",  margin:"15px"}} placeholder='Enter destination city' value={destinationCity} onChange={(event) => setdestinationCity(event.target.value)}/>
            <input type="date" className="form-control"style={{width: "300px",  margin:"15px"}} value={departureDate} onChange={(event) => setdepartureDate(event.target.value)}/>
            <button onClick={submitHandler} className="btn btn-primary" style={{width: "300px",  margin:"15px"}} >Submit</button>
        </form>
    </div>
  )
}
