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
        main: "",
        airDescription: "",
        components: {},
        myTime: "",
        visible: false,
        stormy: false,
        cloudy: false,
        clearSky: false,
        snowy: false,
        isDay: true,
        detailSeen: false,
      },
      newCity: {
        citySearch: "",
        cityName: "",
        country: "",
        feelsLike: 0,
        temperature: 0,
        timeOftheDay: "",
        weatherDescription: "",
        main: "",
        airDescription: "",
        components: {},
        myTime: "",
        visible: false,
        stormy: false,
        cloudy: false,
        clearSky: false,
        snowy: false,
        isDay: true,
        myUnixTime: 0,
        detailSeen: false,
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
        this.currentCity.cityName = data.cityName;
        this.currentCity.country = data.countryCode;
        this.currentCity.feelsLike = data.feelsLikeTemperature;
        this.currentCity.temperature = data.temperature;
        this.currentCity.weatherDescription = data.weatherDescription;
        this.currentCity.main = data.main;
        this.currentCity.airDescription = data.valueIndex;
        this.currentCity.components = data.componentsList;
        console.log(this.currentCity.main);

        if (this.currentCity.main.includes("Clear")) {
          this.currentCity.clearSky = true;
          this.currentCity.cloudy = false;
          this.currentCity.stormy = false;
          this.currentCity.snowy = false;
        }

        if (this.currentCity.main.includes("Thunderstorm") || this.currentCity.main.includes("Rain")) {
          this.currentCity.stormy = true;
          this.currentCity.cloudy = false;
          this.currentCity.clearSky = false;
          this.currentCity.snowy = false;
        }

        if (this.currentCity.main.includes("Clouds")) {
          this.currentCity.cloudy = true;
          this.currentCity.clearSky = false;
          this.currentCity.stormy = false;
          this.currentCity.snowy = false;
        }

        if (this.currentCity.main.includes("Snow") || this.currentCity.main.includes("Mist")) {
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
      } catch (error) {
        console.log(error);
      }
    },

    getSearchCityWeather: async function () {

      const URL = `http://localhost:5000/api/city?q=${this.newCity.citySearch}`;
      console.log(this.newCity.citySearch);
      try {
        const response = await fetch(URL);
        const data = await response.json();
        this.newCity.citySearch = "";
        this.newCity.cityName = data.cityName;
        this.newCity.country = data.countryCode;
        this.newCity.feelsLike = data.feelsLikeTemperature;
        this.newCity.temperature = data.temperature;
        this.newCity.weatherDescription = data.weatherDescription;
        this.newCity.airDescription = data.valueIndex;
        this.newCity.components = data.componentsList;
        this.newCity.myUnixTime = data.myUnixTime;
        this.newCity.main

        if (this.newCity.weatherDescription.includes("clear") || this.newCity.weatherDescription.includes("few")) {
          this.newCity.clearSky = true;
          this.newCity.cloudy = false;
          this.newCity.stormy = false;
          this.newCity.snowy = false;
        }

        if (this.newCity.weatherDescription.includes("thunderstorm") || this.newCity.weatherDescription.includes("rain")) {
          this.newCity.stormy = true;
          this.newCity.cloudy = false;
          this.newCity.clearSky = false;
          this.newCity.snowy = false;
        }

        if (this.newCity.weatherDescription.includes("clouds")) {
          this.newCity.cloudy = true;
          this.newCity.clearSky = false;
          this.newCity.stormy = false;
          this.newCity.snowy = false;
        }

        if (this.newCity.weatherDescription.includes("snow") || this.newCity.weatherDescription.includes("mist")) {
          this.newCity.snowy = true;
          this.newCity.stormy = false;
          this.newCity.cloudy = false;
          this.newCity.clearSky = false;
        }

        this.cities.push({...this.newCity});
      } catch (error) {
        this.cityFound = true;
        this.visible = false;
      }
    },

    deleteCity(index) {
      this.cities.splice(index, 1);
    },

    // removeDuplicates () {
    //   this.cities = [ ...new Set(this.cities) ];
    // }
  },


  mounted() {
    if (window.localStorage.getItem('city-list')) {
      this.cities = JSON.parse(window.localStorage.getItem('city-list' || '[]'));
    }
  },

  watch: {
   cities: {
     handler(newCities) {
       window.localStorage.setItem('city-list', JSON.stringify(newCities));
     },
     deep: true,
   }
 },


  beforeMount () {
    this.getCurrentWeather()
 },
};
