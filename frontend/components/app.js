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
        myTime: "",
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
        myTime: "",
        myUnixTime: 0,
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
        this.currentCity.cityName = data.cityName;
        // this.cities.unshift(this.currentCity.cityName);
        // this.cities.push(this.currentCity.cityName);
        this.myWeatherCities.push(data);
        var time = new Date();
        this.currentCity.myTime = time.toLocaleString('en-US', { hour: 'numeric', hour12: true });

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
        this.newCity = data;
        this.myWeatherCities.push({...this.data});
      } catch (error) {
        console.log(error);
      }

      this.getMyCities();
    },


    getMyCities() {
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

      this.getMyCities();
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
     this.getMyCities();
    })
  },
};
