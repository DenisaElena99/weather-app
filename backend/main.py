import flask
import geocoder
import config
from flask import Flask, request
from flask_cors import CORS
import requests


app = flask.Flask(__name__)
CORS(app)


def get_air_index_value(air_index):
    value = None
    if air_index == 1:
        value = 'Good'
    if air_index == 2:
        value = 'Fair'
    if air_index == 3:
        value = 'Moderate'
    if air_index == 4:
        value = 'Poor'
    if air_index == 5:
        value = 'Very Poor'
    return value


def get_weather(response_weather, response_air_pollution):
    city_data = {
        'cityName': response_weather['name'],
        'countryCode': response_weather['sys']['country'],
        'temperature': int(response_weather['main']['temp'] - 273.15),
        'feelsLikeTemperature': int(response_weather['main']['feels_like'] - 273.15),
        'weatherDescription': response_weather['weather'][0]['description'],
        'airIndexValue': get_air_index_value(response_air_pollution['list'][0]['main']['aqi']),
        'componentsList': response_air_pollution['list'][0]['components'],
        'mainWeatherDescription': response_weather['weather'][0]['main'],
    }
    return city_data


@app.route('/api/city_name')
def get_city():
    city = request.args.get('name')
    weatherUrl = f'http://api.openweathermap.org/data/2.5/weather?q={city}&APPID={config.API_KEY}'
    response_weather_url = requests.get(weatherUrl)
    if response_weather_url.status_code == 200:
        try:
            response_weather = response_weather_url.json()
            coordinates = response_weather['coord']
            lat = coordinates['lat']
            lon = coordinates['lon']
            airPollutionUrl = f'http://api.openweathermap.org/data/2.5/air_pollution?lat={lat}&lon={lon}&appid={config.API_KEY}'
            response_air_pollution_url = requests.get(airPollutionUrl)
            if response_air_pollution_url.status_code == 200:
                try:
                    response_air_pollution = response_air_pollution_url.json()
                    city_data = get_weather(response_weather, response_air_pollution)
                    return city_data
                except ValueError:
                    return str(response_air_pollution_url.status_code)
        except ValueError:
            return str(response_weather_url.status_code)
    return str(response_weather_url.status_code)


@app.route('/api/currentCity')
def index():
    currentLocation = geocoder.ip('me')
    coordinates = currentLocation.latlng
    lat = coordinates[0]
    lon = coordinates[1]
    weatherUrl = f'http://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&APPID={config.API_KEY}'
    response_weather_url = requests.get(weatherUrl)
    if response_weather_url.status_code == 200:
        try:
            response_weather = response_weather_url.json()
        except ValueError:
            return ValueError
    airPollutionUrl = f'http://api.openweathermap.org/data/2.5/air_pollution?lat={lat}&lon={lon}&appid={config.API_KEY}'
    response_air_pollution_url = requests.get(airPollutionUrl)
    if response_weather_url.status_code == 200:
        try:
            response_air_pollution = response_air_pollution_url.json()
        except ValueError:
            return ValueError
    city_data = get_weather(response_weather, response_air_pollution)
    return city_data


if __name__ == '__main__':
    app.run(debug=True)
