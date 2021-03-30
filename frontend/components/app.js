var App = {
  template: '#template--app',
  components: {
    'city': City
  },
  data() {
    return {
      cities : ["Basel", "New York"],
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
        citySearch: "",
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
    // getCurrentWeather: async function () {
    //
    //   const URL = `http://localhost:5000/api/currentCity`;
    //   try {
    //     const response = await fetch(URL);
    //     const data = await response.json();
    //     this.currentCity.cityName = data.cityName;
    //     // this.cities.push(this.currentCity.cityName);
    //     this.currentCity.country = data.countryCode;
    //     this.currentCity.feelsLike = data.feelsLikeTemperature;
    //     this.currentCity.temperature = data.temperature;
    //     this.currentCity.weatherDescription = data.weatherDescription;
    //     this.currentCity.main = data.main;
    //     this.currentCity.airDescription = data.valueIndex;
    //     this.currentCity.components = data.componentsList;
    //
    //     var time = new Date();
    //     this.currentCity.myTime = time.toLocaleString('en-US', { hour: 'numeric', hour12: true });
    //
    //     // this.cities.push(this.currentCity);
    //
    //   } catch (error) {
    //     console.log(error);
    //   }
    // },

    // getSearchCityWeather: async function () {
    //   const URL = `http://localhost:5000/api/city?q=`;
    //   const citiess= this.cities.map(city =>
    //     fetch(URL + city, { method: "GET" }).then(res => res.json())
    //   );
    //   this.cities.push(this.newCity.citySearch);
    //   try {
    //     const response = await fetch(URL);
    //     const data = await response.json();
    //     this.newCity.citySearch = "";
    //     this.newCity.cityName = data.cityName;
    //     this.newCity.country = data.countryCode;
    //     this.newCity.feelsLike = data.feelsLikeTemperature;
    //     this.newCity.temperature = data.temperature;
    //     this.newCity.weatherDescription = data.weatherDescription;
    //     this.newCity.airDescription = data.valueIndex;
    //     this.newCity.components = data.componentsList;
    //     this.newCity.myUnixTime = data.myUnixTime;
    //     this.newCity.main = data.main;
    //
    //     // this.cities.push({...this.newCity});
    //   } catch (error) {
    //     console.log(error);
    //   }
    // },

    deleteCity(index) {
      this.cities.splice(index, 1);
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
    })
  },
};
