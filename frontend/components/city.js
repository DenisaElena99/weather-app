var City = {
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
    detailSeen: Boolean,
    hideDeleteButton: Boolean,
  },
  methods: {
    deleteCity(index) {
      this.$emit('deleteCity', this.cityName)
    },

    getWeatherBackground() {
      if (this.mainWeatherDescription == "Clear") {
        return "clear-sky-few-clouds"
      } else if (this.mainWeatherDescription == "Clouds") {
        return "clouds"
      } else if (this.mainWeatherDescription == "Thunderstorm" || this.mainWeatherDescription == "Rain") {
        return "rain-thunderstorm"
      } else if (this.mainWeatherDescription == "Snow" || this.mainWeatherDescription == "Mist") {
        return "snow-mist"
      }
      return "unknown"
    },
  },
};
