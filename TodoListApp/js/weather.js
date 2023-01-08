const API_KEY ="03c71309464764666f364da3469fb32e";

function onGeoOk(position){
  const lat = position.coords.latitude;//위도
  const lng = position.coords.longitude;//경도
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}`;
  fetch(url)
  .then((response) => response.json())
  .then((data) => {
    const weather = document.querySelector("#weather span:first-child");
    const city = document.querySelector("#weather span:last-child");
    city.innerText = data.name;
    weather.innerText = /*${data.weather[0].main}*/ ` ${Math.floor(data.main.temp - 273.15)} °C`;
  });
}
function onGeoError(){
  alert("can't you find you,,,");
}
navigator.geolocation.getCurrentPosition(onGeoOk,onGeoError);
