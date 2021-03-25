var App = {
  template: '#template--app',
  components: {
    'city': City
  },
  data() {
    return {
      cities : [],
      currentCity: {
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
      newCity: {
        citySearch: "",
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

      const URL = `http://localhost:5000/api/currentCity`;
      try {
        const response = await fetch(URL);
        const data = await response.json();
        // console.log(data);
        this.currentCity.cityName = data.cityName;
        this.currentCity.country = data.countryCode;
        this.currentCity.feelsLike = data.feelsLikeTemperature;
        this.currentCity.temperature = data.temperature;
        this.currentCity.weatherDescription = data.weatherDescription;
        this.currentCity.airDescription = data.valueIndex;
        this.currentCity.components = data.componentsList;

        if (this.currentCity.weatherDescription.includes("Clear") || this.currentCity.weatherDescription.includes("Few")) {
          this.currentCity.cloudy = true;
          this.currentCity.clearSky = false;
          this.currentCity.stormy = false;
          this.currentCity.snowy = false;
        }

        if (this.currentCity.weatherDescription.includes("Thunderstorm") || this.currentCity.weatherDescription.includes("Rain")) {
          this.currentCity.stormy = true;
          this.currentCity.cloudy = false;
          this.currentCity.clearSky = false;
          this.currentCity.snowy = false;
        }

        if (this.currentCity.weatherDescription.includes("Clouds")) {
          this.currentCity.cloudy = true;
          this.currentCity.clearSky = false;
          this.currentCity.stormy = false;
          this.currentCity.snowy = false;
        }

        if (this.currentCity.weatherDescription.includes("Snow") || this.currentCity.weatherDescription.includes("Mist")) {
          this.currentCity.snowy = true;
          this.currentCity.stormy = false;
          this.currentCity.cloudy = false;
          this.currentCity.clearSky = false;
        }

        this.visible = true;
        this.cityFound = false;

        var time = new Date();
        this.currentCity.myTime = time.toLocaleString('en-US', { hour: 'numeric', hour12: true });

        this.cities.push(this.currentCity);
        console.log(this.cities);
      } catch (error) {
        console.log(error);
        this.cityFound = true;
        this.visible = false;
      }
    },

    getSearchCityWeather: async function () {
      const URL = `http://localhost:5000/api/city?q=${this.newCity.citySearch}`;
      console.log(this.newCity.citySearch);
      try {
        const response = await fetch(URL);
        const data = await response.json();
        console.log(data);
        this.newCity.citySearch = "";
        this.newCity.cityName = data.cityName;
        this.newCity.country = data.countryCode;
        this.newCity.feelsLike = data.feelsLikeTemperature;
        this.newCity.temperature = data.temperature;
        this.newCity.weatherDescription = data.weatherDescription;
        this.newCity.airDescription = data.valueIndex;
        this.newCity.components = data.componentsList;

        if (this.newCity.weatherDescription.includes("Clear") || this.newCity.weatherDescription.includes("Few")) {
          this.newCity.cloudy = true;
          this.newCity.clearSky = false;
          this.newCity.stormy = false;
          this.newCity.snowy = false;
        }

        if (this.newCity.weatherDescription.includes("Thunderstorm") || this.newCity.weatherDescription.includes("Rain")) {
          this.newCity.stormy = true;
          this.newCity.cloudy = false;
          this.newCity.clearSky = false;
          this.newCity.snowy = false;
        }

        if (this.newCity.weatherDescription.includes("Clouds")) {
          this.newCity.cloudy = true;
          this.newCity.clearSky = false;
          this.newCity.stormy = false;
          this.newCity.snowy = false;
        }

        if (this.newCity.weatherDescription.includes("Snow") || this.newCity.weatherDescription.includes("Mist")) {
          this.newCity.snowy = true;
          this.newCity.stormy = false;
          this.newCity.cloudy = false;
          this.newCity.clearSky = false;
        }

        this.visible = true;
        this.cityFound = false;

        var time = new Date();
        this.newCity.myTime = time.toLocaleString('en-US', { hour: 'numeric', hour12: true });

        this.cities.push(this.newCity);

      } catch (error) {
        console.log(error);
        this.cityFound = true;
        this.visible = false;
      }
    },
  },
  mounted () {
    this.getCurrentWeather()
 },
};
