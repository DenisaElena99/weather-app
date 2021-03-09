import flask
import geocoder
from flask import json
from flask import jsonify
from flask import render_template
from flask import Flask, request
from flask_cors import CORS
import requests


app = flask.Flask(__name__)
CORS(app)


API_KEY = '8a32fd121053564c34ba85f67b98ce2f'


def current_location():
    myloc = geocoder.ip('me')
    return myloc.latlng

def get_air_index_value(airIndex):
    value = None
    if airIndex == 1:
        value = 'Good'
    if airIndex == 2:
        value  = 'Fair'
    if airIndex == 3:
        value = 'Moderate'
    if airIndex == 4:
        value = 'Poor'
    if airIndex == 5:
        value = 'Very Poor'
    return value


@app.route('/api/city')
def get_city():
    city = request.args.get('q')
    urlWeather = f'http://api.openweathermap.org/data/2.5/weather?q={city}&APPID={API_KEY}'
    responseWeather = requests.get(urlWeather).json()
    coordinates = responseWeather['coord']
    lat = coordinates['lat']
    lon = coordinates['lon']
    urlAirPollution = f'http://api.openweathermap.org/data/2.5/air_pollution?lat={lat}&lon={lon}&appid={API_KEY}'
    responseAirPollution = requests.get(urlAirPollution).json()
    city = responseWeather['name']
    sys = responseWeather['sys']
    country_code = sys['country']
    weather = responseWeather['weather']
    weather_description = weather[0]['description']
    timeOfTheDay = weather[0]['icon']
    main = responseWeather['main']
    feels_like_temperature = main['feels_like']
    list = responseAirPollution['list']
    mainIndex = list[0]['main']
    componentsList = list[0]['components']
    co = componentsList['co']
    no = componentsList['no']
    no2 = componentsList['no2']
    o3 = componentsList['o3']
    so2 = componentsList['so2']
    pm2_5 = componentsList['pm2_5']
    pm10 = componentsList['pm10']
    nh3 = componentsList['nh3']
    airIndex = mainIndex['aqi']
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
        'airQualityIndex': airIndex,
        'valueIndex': value,
        'timeOfTheDay': timeOfTheDay,
        'CO': co,
        'NO': no,
        'NO2': no2,
        'O3': o3,
        'SO2': so2,
        'PM25': pm2_5,
        'PM10': pm10,
        'NH3': nh3,
    }
    return DATA


@app.route('/api/currentCity')
def index():
    coordinates = current_location();
    lat = coordinates[0]
    lon = coordinates[1]
    urlWeather = f'http://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&APPID={API_KEY}'
    urlAirPollution = f'http://api.openweathermap.org/data/2.5/air_pollution?lat={lat}&lon={lon}&appid={API_KEY}'
    responseWeather = requests.get(urlWeather).json()
    responseAirPollution = requests.get(urlAirPollution).json()
    city = responseWeather['name']
    sys = responseWeather['sys']
    country_code = sys['country']
    weather = responseWeather['weather']
    weather_description = weather[0]['description']
    timeOfTheDay = weather[0]['icon']
    main = responseWeather['main']
    feels_like_temperature = main['feels_like']
    list = responseAirPollution['list']
    mainIndex = list[0]['main']
    componentsList = list[0]['components']
    co = componentsList['co']
    no = componentsList['no']
    no2 = componentsList['no2']
    o3 = componentsList['o3']
    so2 = componentsList['so2']
    pm2_5 = componentsList['pm2_5']
    pm10 = componentsList['pm10']
    nh3 = componentsList['nh3']
    airIndex = mainIndex['aqi']
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
        'airQualityIndex': airIndex,
        'valueIndex': value,
        'timeOfTheDay': timeOfTheDay,
        'CO': co,
        'NO': no,
        'NO2': no2,
        'O3': o3,
        'SO2': so2,
        'PM25': pm2_5,
        'PM10': pm10,
        'NH3': nh3,
    }
    return DATA


if __name__ == '__main__':
    app.run(debug=True)
