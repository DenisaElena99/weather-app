var App = Vue.component('App', {
  template: '#template--app',
  data() {
    return {
      citySearch: '',
      newCity: {
        cityName: "",
        country: "",
        feelsLike: "",
        temperature: "",
        timeOftheDay: "",
        weatherDescription: "",
        airDescription: "",
        components: "",
      },
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
    getWeather: async function () {
      console.log(this.citySearch);
      const URL = `http://localhost:5000/api/currentCity`;
      try {
        const response = await fetch(URL);
        const data = await response.json();
        console.log(data);
        this.newCity = data;
        this.citySearch= "";

        const mainWeather = newCity.weatherDescription;

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

    // addCity() {
    //   this.cities.push({
    //     cityName: this.newTodo,
    //   });
    //   this.newCity = '';
    // },
    //
    //
    // deleteCity (index) {
    //   this.cities.splice(index, 1);
    // },
  }
});
