const City = {
  template: '#template--city',
  props:
  {
    cityName: String,
    countryCode: String,
    feelsLikeTemperature: Number,
    temperature: Number,
    timeOftheDay: String,
    weatherDescription: String,
    mainWeatherDescription: String,
    airIndexValue: String,
    componentsList: Object,
    hour: String,
    index: Number,
    hideDeleteButton: Boolean,
  },

  data() {
    return {
      detailSeen: false,
    };
  },

  methods: {
    deleteCity(index) {
      this.$emit('deleteCity', this.cityName)
    },

    getWeatherBackgroundClass() {
      if (this.mainWeatherDescription == "Clear") {
        return "clear-sky-few-clouds"
      } else if (this.mainWeatherDescription == "Clouds") {
        return "clouds"
      } else if (
        this.mainWeatherDescription == "Thunderstorm" ||
        this.mainWeatherDescription == "Rain") {
        return "rain-thunderstorm"
      } else if (
        this.mainWeatherDescription == "Snow" ||
        this.mainWeatherDescription == "Mist" ||
        this.mainWeatherDescription == "Haze" ||
        this.mainWeatherDescription == "Dust" ||
        this.mainWeatherDescription == "Smoke" ||
        this.mainWeatherDescription == "Fog" ||
        this.mainWeatherDescription == "Sand" ||
        this.mainWeatherDescription == "Ash" ||
        this.mainWeatherDescription == "Squall" ||
        this.mainWeatherDescription == "Tornado") {
        return "snow-mist"
      }
      return "unknown"
    },
  },
};
