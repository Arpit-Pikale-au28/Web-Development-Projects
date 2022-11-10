import React, { useState, useEffect } from 'react'
import '../App.css'

export const CallAPI = () => {
    const [data, setData] = useState([])
    async function getData() {
        const response = await fetch('https://api.github.com/users', {
            headers: {
                'Authorization': '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',
            }
        });
        const payload = await response.json();
        console.log(payload);
        setData(payload)
      }
  
      useEffect(() => {
        getData();
      }, []);

      const renderList = ()=> {
        return (
          <>
          <table>
            <tr>
              <th className='w-20'>Id</th>  
              <th>Login</th>
              <th>Click Here to See Profile</th>
            </tr>
            {data.map((item) => { 
                return (
                <tr>
                  <td>{item.id}</td>
                  <td>{item.login}</td>
                  <td><button type="button"className="btn btn-primary"><a href={item.html_url} target="_blank" rel="noreferrer" className='text-white text-decoration-none '>View Profile</a></button></td>
                  
                </tr>
                )
              })
             
            }
            
          </table>
          </>
        )
     }
  
  return (
      <>{renderList()}</>
  )
}
