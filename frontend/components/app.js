var App = {
  template: '#template--app',
  components: {
    'city': City
  },
  data() {
    return {
      citySearch: '',
      cities : [],
      cityName: "",
      country: "",
      feelsLike: 0,
      temperature: 0,
      timeOftheDay: "",
      weatherDescription: "",
      airDescription: "",
      components: {},
      co: "",
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
        this.cityName = data.cityName;
        this.country = data.countryCode;
        this.feelsLike = data.feelsLikeTemperature;
        this.temperature = data.temperature;
        this.weatherDescription = data.weatherDescription;
        this.airDescription = data.valueIndex;
        this.components = data.componentsList;
        this.citySearch= '';

        console.log(this.components);

        const mainWeather = this.weatherDescription;

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
  },
  beforeMount() {
    this.getWeather()
 },
};
