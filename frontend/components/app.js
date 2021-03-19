var App = Vue.component('App', {
  props: ['city'],
  template: '#template--app',
  data() {
    return {
      newCity: '',
      cities : [],
      isDay: true,
      cityFound: false,
      visible: false,
      time: 0,
      stormy: false,
      cloudy: false,
      clearSky: false,
      snowy: false,
    }
  },
  methods: {
    getWeather () {
      console.log(this.citySearch);
      const URL = 'http://localhost:5000/api/currentCity';
      try {
        fetch(URL)
          .then(res => res.json())
          .then(data => console.log(data))
        this.citySearch= "";
        this.newCity.cityName = data.cityName;
        this.newCity.country = data.countryCode;
        this.newCity.feelsLike = data.feelsLikeTemperature;
        this.newCity.temperature = data.temperature;
        this.newCity.timeOftheDay = data.timeOfTheDay;
        this.newCity.weatherDescription = data.weatherDescription;
        this.newCity.airDescription = data.valueIndex;
        this.newCity.components = data.components;

        const mainWeather = city.weatherDescription;

          if (mainWeather.includes("Clear") || mainWeather.includes("Few")) {
            this.clearSky = false;
            this.cloudy = true;
            this.stormy = false;
            this.snowy = false;
          }

          if (mainWeather.includes("Thunderstorm") || mainWeather.includes("Rain")) {
            this.stormy = true;
            this.cloudy = false;
            this.clearSky = false;
            this.snowy = false;
          }

          if (mainWeather.includes("Clouds")) {
            this.cloudy = true;
            this.clearSky = false;
            this.stormy = false;
            this.snowy = false;
          }

          if (mainWeather.includes("Snow") || mainWeather.includes("Mist")) {
            this.snowy = true;
            this.stormy = false;
            this.cloudy = false;
            this.clearSky = false;
          }

          this.visible = true;
          this.cityFound = false;
      } catch (error) {
        console.log(error);
        this.cityFound = true;
        this.visible = false;
      }
    },

    addCity() {
      this.cities.push({
        cityName: this.newTodo,
      });
      this.newCity = '';
    },


    deleteCity (index) {
      this.cities.splice(index, 1);
    },
  }
});
