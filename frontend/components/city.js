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
    main: String,
    valueIndex: String,
    componentsList: Object,
    myTime: String,
    myUnixTime: Number,
    index: Number,
    detailSeen: Boolean,
  },
  methods: {
    deleteCity(index) {
      this.$emit('deleteCity', this.cityName)
    },

    getWeatherBackground() {
      if (this.main == "Clear") {
        return "clear-sky-few-clouds"
      } else if (this.main == "Clouds") {
        return "clouds"
      } else if (this.main == "Thunderstorm" || this.main == "Rain") {
        return "rain-thunderstorm"
      } else if (this.main == "Snow" || this.main == "Mist") {
        return "snow-mist"
      }
      return "unknown"
    },
  }
};
