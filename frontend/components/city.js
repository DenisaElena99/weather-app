var City = {
  template: '#template--city',
  props:
  {
    cityName: String,
    country: String,
    feelsLike: Number,
    temperature: Number,
    timeOftheDay: String,
    weatherDescription: String,
    airDescription: String,
    components: Object,
    myTime: String,
    stormy: Boolean,
    cloudy: Boolean,
    clearSky: Boolean,
    snowy: Boolean,
    myUnixTime: Number,
    index: Number,
    detailSeen: Boolean, 
  },
  methods: {
    deleteCity(index) {
      this.$emit('deleteCity', this.cityName)
    }
  }
};
