const URL = 'http://localhost:5000/api/currentCity';
const elWeather = document.querySelector('#city');

fetch(URL).then((res) => {
  return res.json();
}).then((res) => {
  elWeather.innerHTML = JSON.stringify(res, null, 2);
});
