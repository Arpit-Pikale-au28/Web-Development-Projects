import { useState, useEffect } from "react";
import axios from "axios";
import { FaTemperatureLow, FaLocationArrow } from "react-icons/fa";
import { BsFillCloudSunFill, BsSearch } from "react-icons/bs";

function Getinfo() {
  var [city, setcity] = useState("");
  const [data, setdata] = useState({
    name: "",
    description: "",
    main: { temp: "", min_temp: "", max_temp: "" },
    weather: [{ description: "" }],
  });

  const API_KEY = "af10b0a7c01f4ad36b87808109dc0525";

  const fetchData = async () => {
    await axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      )
      .then((response) => {
        setdata(response.data);
      })
      .catch((err) => console.log(err));
  };

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(async (data) => {
      let lat = data.coords.latitude.toFixed(2);
      let lon = data.coords.longitude.toFixed(2);
      await axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
        )
        .then((response) => {
          // console.log(response)
          setdata(response.data);
        })
        .then((err) => console.log(err));
    });
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  console.log("data", data);
  return (
    <>
      <center>
        Please allow loaction to get your current loaction whether
      </center>
      <div className="container">
        <h2 style={{ color: "purple" }}>Get Wheather Infomation</h2>

        <input
          type="text"
          className="form-control"
          required
          style={{ width: "300px", margin: "15px" }}
          placeholder="Enter a cityname"
          onChange={(event) => setcity(event.target.value)}
        />
        <button type="button" onClick={fetchData} className="btn btn-primary">
          <BsSearch/> Search
        </button>
      </div>{" "}
      <br />
      <div
        className="container"
        style={{
          border: "2px solid black",
          width: "600px",
          background: "black",
          color: "white",
          opacity: "0.7",
        }}
      >
        <h4>
          <FaLocationArrow /> {data.name}
        </h4>{" "}
        <br />
        <h5>
          <BsFillCloudSunFill /> {data.weather[0].description}
        </h5>{" "}
        <br />
        <h5>
          <FaTemperatureLow /> {data.main.temp}°C
        </h5>{" "}
        <br />
        <p>
          Max <FaTemperatureLow /> : {data.main.temp_max}°C | Min{" "}
          <FaTemperatureLow /> : {data.main.temp_max}°C
        </p>
      </div>
    </>
  );
}

export default Getinfo;
