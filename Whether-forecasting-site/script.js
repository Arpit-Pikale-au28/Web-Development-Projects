
var btnele = document.getElementById("submit");


const API_KEY = "af10b0a7c01f4ad36b87808109dc0525";



btnele.addEventListener('click', getWeather);


function getWeather() {
    var citynameElement = document.getElementById("cityname");
    var cityname = citynameElement.value;
    const fetchResopnse = fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${API_KEY}`);

    const fetchPromiseHandle = fetchResopnse.then(
        (res) => {
            return res.json()
        },
        (rej) => {console.log(rej)}
    );

    const response = fetchPromiseHandle.then(
        (data) => {
            var citynm = data.name; 
            var cityele = document.getElementById('city');
            cityele.innerText =`${citynm}`;
           
            var weather = data.weather[0].description;
            var weatherele = document.getElementById('weather');
            weatherele.innerText = `Weather = ${weather}`;
     
            var temp = data.main.temp
            var tempInCelcius = Number(temp) - 273.15;
            var pele = document.getElementById("temp");
            pele.innerText = (`Temperature =  ${tempInCelcius.toFixed(2)}`);

            var timezone = data.timezone;
            console.log(timezone);
            var convertTime = new Date((new Date().getTime())-timezone*1000);
            var timezonele = document.getElementById('timezone');
            timezonele.innerText = `Timezone = ${convertTime}`;
        }
    )
}
   