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
        weatherDescription: "",
        main: "",
        airDescription: "",
        components: {},
        myTime: "",
        detailSeen: false,
      },
      newCity: {
        citySearch: "",
        cityName: "",
        country: "",
        feelsLike: 0,
        temperature: 0,
        weatherDescription: "",
        main: "",
        airDescription: "",
        components: {},
        myTime: "",
        myUnixTime: 0,
        detailSeen: false,
      },
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
        this.newCity.main = data.main;

        this.cities.push({...this.newCity});
      } catch (error) {
        console.log(error);
      }
    },

    deleteCity(index) {
      this.cities.splice(index, 1);
    },
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
