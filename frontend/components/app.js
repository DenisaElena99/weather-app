var App = Vue.component('App', {
  props: ['city'],
  template: '#template--app',
  data() {
    return {
      newCity: '',
      cities : [],
    }
  },
  methods: {
    getWeather () {
      const URL = 'http://localhost:5000/api/currentCity';
      fetch(URL)
        .then(res => res.json())
        .then(data => console.log(data))
      this.citySearch= "";
      this.city.cityName = data.cityName;
      this.city.country = data.countryCode;
      this.feelsLike = data.feelsLikeTemperature;
      this.temperature = data.temperature;
      this.timeOftheDay = data.timeOfTheDay;
      this.weatherDescription = data.weatherDescription;
      this.airDescription = data.valueIndex;
      this.components = data.components;
    },

    addCity() {
      this.cities.push({
        cityName: this.newCity
      });
      this.newCity = '';
    },


    deleteCity (index) {
      this.cities.splice(index, 1);
    },
  }
});
