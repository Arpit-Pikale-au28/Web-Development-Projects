import React, { useState, useEffect } from 'react';
import './App.css';

export default function App() {
  var Gpayload = null;
  const [search, setSearch] = useState("")
  const [movies, setMovies] = useState([]);

    async function getMovies() {
      const response = await fetch('http://localhost:3001/api/movies');
      const payload = await response.json();
      setMovies(payload)
    }

    useEffect(() => {
      getMovies();
    }, []);

    async function getSearchMovie() {
      const response = await fetch(`http://localhost:3001/api/movies/${search}`);
      const payload = await response.json();
      console.log(payload);
    }

    const renderList = ()=> {
        return (
          <>
          <input type="text" placeholder='Enter Movie Id to Search' value={search} name="name" onChange={(e)=> {setSearch(e.target.value)}} />
          <button onClick={getSearchMovie}>Search</button>
          <table>
            <tr>
              <th>Id</th>
              <th>Movie Name</th>
              <th>Overview</th>
              <th>Release Date</th>
              <th>Vote Average</th>
            </tr>
            {movies.map((item) => {
                return (
                  <tr>
                  <td><h3>{item.id}</h3></td>
                  <td><h4>{item.original_title}</h4></td>
                  <td>{item.overview}</td>
                  <td>{item.release_date}</td>
                  <td><h4>{item.vote_average}</h4></td>
                </tr> 
                )
              })
            }
          </table>
          </>
        )
     }
  
  return <>{renderList()}</>
}

