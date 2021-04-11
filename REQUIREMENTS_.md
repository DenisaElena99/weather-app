# REQUIREMENTS: 

# App body should have:
- City name 
- Country code
- Temperature (metric)
- Weather description (example: “Clear sky”)
- Feels-like temperature
- Air Quality Index (value, status) (example: 3, Moderate)
- Button for displaying the components (polluting gases)
-- Should display a list 
- Button for adding the city to my fav list 
- Button for displaying my fav list of cities 
- Button for deleting a city from my fav list 
-  Changing background animation depending on the weather description

 -- API call for current weather data:
```html
api.openweathermap.org/data/2.5/weather?q=${this.citySearch}&appid={API key}
```
 -- Fetch, Json
 -- Get the data for each field 
 - City name -> data.name
 - Country code -> data.country
 - Temperature (metric) -> data.main.temp
 - Weather description -> data.weather.description
 - Feels-like temperature -> data.main.feels_like

 -- API call for current air pollution: 
 ```html
http://api.openweathermap.org/data/2.5/air_pollution?lat=${this.lat}&lon=${this.lon}&appid={API key}
```

# HTML body should have:
 - Changing background depending on the local time of each city by the icon field of the API used. When we see the letter ‘n’ means that is night, so the background will be dark, otherwise it will be a lighter one


