import flask
import geocoder
from flask import json
from flask import jsonify
from flask import Flask, request
from flask_cors import CORS
import requests


app = flask.Flask(__name__)
CORS(app)


API_KEY = '9ec5e8e4bb0bdc6b69f0e8ce7daa9b4a'


def current_location():
    myloc = geocoder.ip('me')
    return myloc.latlng


def get_air_index_value(airIndex):
    value = None
    if airIndex == 1:
        value = 'Good'
    if airIndex == 2:
        value = 'Fair'
    if airIndex == 3:
        value = 'Moderate'
    if airIndex == 4:
        value = 'Poor'
    if airIndex == 5:
        value = 'Very Poor'
    return value


def get_weather(responseWeather, responseAirPollution):
    city = responseWeather['name']
    sys = responseWeather['sys']
    country_code = sys['country']
    weather = responseWeather['weather']
    weather_description = weather[0]['description']
    main_weather = weather[0]['main']
    main = responseWeather['main']
    feels_like_temperature = main['feels_like']
    list = responseAirPollution['list']
    mainIndex = list[0]['main']
    airIndex = mainIndex['aqi']
    componentsList = list[0]['components']
    myUnixTime = responseWeather['dt']
    value = get_air_index_value(airIndex)

    if responseWeather['cod'] != 200:
        message = responseWeather.get('message', '')
        return f'Error getting temperature for {city}. Error message = {message}'

    current_temperature = main['temp']

    if current_temperature:
        current_temperature_celsius = int(current_temperature - 273.15)
        feels_like_temperature = int(feels_like_temperature - 273.15)

    DATA = {
        'cityName': city,
        'countryCode': country_code,
        'temperature': current_temperature_celsius,
        'weatherDescription': weather_description,
        'feelsLikeTemperature': feels_like_temperature,
        'valueIndex': value,
        'componentsList': componentsList,
        'hour': myUnixTime,
        'main': main_weather,
    }
    return DATA


@app.route('/api/city')
def get_city():
    city = request.args.get('q')
    print(city)
    urlWeather = f'http://api.openweathermap.org/data/2.5/weather?q={city}&APPID={API_KEY}'
    responseWeather = requests.get(urlWeather).json()
    if responseWeather['cod'] != 200:
        message = responseWeather.get('message', '')
        return f'Error getting data for {city}. Error message = {message}'
    print(responseWeather)
    coordinates = responseWeather['coord']
    lat = coordinates['lat']
    lon = coordinates['lon']
    urlAirPollution = f'http://api.openweathermap.org/data/2.5/air_pollution?lat={lat}&lon={lon}&appid={API_KEY}'
    responseAirPollution = requests.get(urlAirPollution).json()
    DATA = get_weather(responseWeather, responseAirPollution)
    return DATA


@app.route('/api/currentCity')
def index():
    coordinates = current_location();
    lat = coordinates[0]
    lon = coordinates[1]
    urlWeather = f'http://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&APPID={API_KEY}'
    urlAirPollution = f'http://api.openweathermap.org/data/2.5/air_pollution?lat={lat}&lon={lon}&appid={API_KEY}'
    responseWeather = requests.get(urlWeather).json()
    if responseWeather['cod'] != 200:
        message = responseWeather.get('message', '')
        return f'Error getting data  for {city}. Error message = {message}'
    responseAirPollution = requests.get(urlAirPollution).json()
    DATA = get_weather(responseWeather, responseAirPollution)
    return DATA


if __name__ == '__main__':
    app.run(debug=True)
