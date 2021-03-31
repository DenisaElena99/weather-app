var App = {
  template: '#template--app',
  components: {
    'city': City
  },
  data() {
    return {
      cities : [],
      citySearch: "",
      currentCity: {
        cityName: "",
        countryCode: "",
        feelsLikeTemperature: 0,
        temperature: 0,
        weatherDescription: "",
        main: "",
        valueIndex: "",
        components: {},
        hour: 0,
        detailSeen: false,
      },
      newCity: {
        cityName: "",
        countryCode: "",
        feelsLikeTemperature: 0,
        temperature: 0,
        weatherDescription: "",
        main: "",
        valueIndex: "",
        componentsList: {},
        hour: 0,
        detailSeen: false,
      },
      myWeatherCities: [],
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
        // this.currentCity.cityName = data.cityName;
        // this.cities.unshift({...this.currentCity.cityName});
        this.myWeatherCities.unshift(data);

        // this.cities.push(this.currentCity);

      } catch (error) {
        console.log(error);
      }
    },

    getSearchCityWeather: async function () {
      const URL = `http://localhost:5000/api/city?q=${this.citySearch}`;
      console.log(this.citySearch);
      this.cities.push(this.citySearch);
      try {
        const response = await fetch(URL);
        const data = await response.json();
        this.citySearch = "";

        let unix_timestamp = data.hour;
        // Create a new JavaScript Date object based on the timestamp
        // multiplied by 1000 so that the argument is in milliseconds, not seconds.
        var date = new Date(unix_timestamp * 1000);
        var time = this.getHour(date)
        data.hour = time.toLocaleString('en-US', { hour: 'numeric', hour12: true });
        // console.log(data.hour);
        this.myWeatherCities.push({...this.data});
      } catch (error) {
        console.log(error);
      }

      this.getMyCitiesInfo();
    },

    getHour(date) {
      var hours = date.getHours();
      var ampm = hours >= 12 ? 'pm' : 'am';
      hours = hours % 12;
      hours = hours ? hours : 12;
      var strTime = hours + ' ' + ampm;
      return strTime;
    },


    getMyCitiesInfo() {
      var res = "";
      const URL = `http://localhost:5000/api/city?q=`;
      const citiesDetails= this.cities.map(city =>
        fetch(`${URL}${city}`, { method: "GET" }).then(res => res.json())
      );
      Promise
        .all(citiesDetails)
        .then(citiesData => {
          this.myWeatherCities = citiesData;
          console.log(this.myWeatherCities);
        })
        .catch(error => {
          console.log(error);
        });
        console.log(this.cities);
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
    })
  },
};
