var App = {
  template: '#template--app',
  components: {
    'city': City
  },
  data() {
    return {
      citySearch: '',
      cities : [],
      newCity: {
        cityName: "",
        country: "",
        feelsLike: 0,
        temperature: 0,
        timeOftheDay: "",
        weatherDescription: "",
        airDescription: "",
        components: {},
        myTime: "",
        visible: false,
        stormy: false,
        cloudy: false,
        clearSky: false,
        snowy: false,
        isDay: true,
      },
      cityFound: false,
    }
  },
  methods: {
    getCurrentWeather: async function () {
      console.log(this.citySearch);
      const URL = `http://localhost:5000/api/currentCity`;
      try {
        const response = await fetch(URL);
        const data = await response.json();
        console.log(data);
        this.newCity.cityName = data.cityName;
        this.newCity.country = data.countryCode;
        this.newCity.feelsLike = data.feelsLikeTemperature;
        this.newCity.temperature = data.temperature;
        this.newCity.weatherDescription = data.weatherDescription;
        this.newCity.airDescription = data.valueIndex;
        this.newCity.components = data.componentsList;
        this.citySearch= '';


        const mainWeather = this.weatherDescription;

          if (mainWeather.includes("Clear") || mainWeather.includes("Few")) {
            this.newCity.cloudy = true;
            this.newCity.clearSky = false;
            this.newCity.stormy = false;
            this.newCity.snowy = false;
          }

          if (mainWeather.includes("Thunderstorm") || mainWeather.includes("Rain")) {
            this.newCity.stormy = true;
            this.newCity.cloudy = false;
            this.newCity.clearSky = false;
            this.newCity.snowy = false;
          }

          if (mainWeather.includes("Clouds")) {
            this.newCity.cloudy = true;
            this.newCity.clearSky = false;
            this.newCity.stormy = false;
            this.newCity.snowy = false;
          }

          if (mainWeather.includes("Snow") || mainWeather.includes("Mist")) {
            this.newCity.snowy = true;
            this.newCity.stormy = false;
            this.newCity.cloudy = false;
            this.vclearSky = false;
          }

          this.visible = true;
          this.cityFound = false;

          var time = new Date();
          this.newCity.myTime = time.toLocaleString('en-US', { hour: 'numeric', hour12: true });

      } catch (error) {
        console.log(error);
        this.cityFound = true;
        this.visible = false;
      }
    },

    // addCity() {
    //   this.cities.push({
    //     cityName: this.,
    //   });
    //   this.newCity = '';
    // },
    //
    //
    // deleteCity (index) {
    //   this.cities.splice(index, 1);
    // },
  },
  mounted () {
    this.getCurrentWeather()
 },
};
