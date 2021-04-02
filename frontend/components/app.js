const App = {
  template: '#template--app',
  components: {
    'city': City
  },
  data() {
    return {
      cityNames : [],
      cityWeather: [],
      citySearch: "",
      currentCity: {
        cityName: "",
        countryCode: "",
        feelsLikeTemperature: 0,
        temperature: 0,
        weatherDescription: "",
        mainWeatherDescription: "",
        airIndexValue: "",
        components: {},
        hour: "",
        detailSeen: true,
        hideDeleteButton: true,
      },
    }
  },

  methods: {

    getCurrentWeather: async function () {
      const URL = `http://localhost:5000/api/currentCity`;
      try {
        const response = await fetch(URL);
        const data = await response.json();
        var time = new Date();
        data.hour = time.toLocaleString('en-US', { hour: 'numeric', hour12: true });
        this.currentCity = data;
      } catch (error) {
        console.log(error);
      }
    },

    getSearchCityWeather: async function () {
      const URL = `http://localhost:5000/api/city_name?name=${this.citySearch}`;
      this.cityNames.push(this.citySearch);
      try {
        const response = await fetch(URL);
        const data = await response.json();
        this.citySearch = "";
        this.cityWeather.push({...data});
      } catch (error) {
        console.log(error);
      }
      this.getCityWeather();
    },

    getCityWeather() {
      var res = "";
      const URL = `http://localhost:5000/api/city_name?name=`;
      const citiesDetails = this.cityNames.map(city =>
        fetch(`${URL}${city}`, { method: "GET" }).then(res => res.json())
      );
      Promise
        .all(citiesDetails)
        .then(citiesData => {
          this.cityWeather = citiesData;
        })
        .catch(error => {
          console.log(error);
        });
    },

    deleteCity(index) {
      this.cityNames.splice(index, 1);
      this.getCityWeather();
    },
  },

  watch: {
    cityNames: {
      handler(newCities) {
        window.localStorage.setItem('city-list', JSON.stringify(newCities));
      },
      deep: true,
    }
  },

  beforeMount() {
     if (window.localStorage.getItem('city-list')) {
       this.cityNames = JSON.parse(window.localStorage.getItem('city-list' || '[]'));
     }
  },

  mounted() {
    this.getCurrentWeather();
    this.getCityWeather();
  },
};
