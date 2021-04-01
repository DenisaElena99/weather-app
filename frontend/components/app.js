var App = {
  template: '#template--app',
  components: {
    'city': City
  },
  data() {
    return {
      cities : [],
      myWeatherCities: [],
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
        hour: 0,
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
      this.cities.push(this.citySearch);
      try {
        const response = await fetch(URL);
        const data = await response.json();
        this.citySearch = "";
        this.myWeatherCities.push({...data});
      } catch (error) {
        console.log(error);
      }
      this.getMyCitiesInfo();
    },

    getMyCitiesInfo() {
      var res = "";
      const URL = `http://localhost:5000/api/city_name?name=`;
      const citiesDetails = this.cities.map(city =>
        fetch(`${URL}${city}`, { method: "GET" }).then(res => res.json())
      );
      Promise
        .all(citiesDetails)
        .then(citiesData => {
          this.myWeatherCities = citiesData;
        })
        .catch(error => {
          console.log(error);
        });
    },

    deleteCity(index) {
      this.cities.splice(index, 1);
      this.getMyCitiesInfo();
    },
  },

  watch: {
    cities: {
      handler(newCities) {
        window.localStorage.setItem('city-list', JSON.stringify(newCities));
      },
      deep: true,
    }
  },

  beforeMount() {
     if (window.localStorage.getItem('city-list')) {
       this.cities = JSON.parse(window.localStorage.getItem('city-list' || '[]'));
     }
  },

  mounted() {
   this.$nextTick(function () {
     this.getCurrentWeather();
     this.getMyCitiesInfo();
   });
  },
};
