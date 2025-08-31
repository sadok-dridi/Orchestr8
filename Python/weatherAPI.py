from dotenv import load_dotenv
import os
import requests
from requests import RequestException
import json

load_dotenv()
weather_api_key = os.getenv("WEATHER_API_KEY")
cityName = "rafraf"

url=f"https://api.openweathermap.org/data/2.5/weather?q={cityName.upper()}&appid={weather_api_key}"

try:
    response = requests.get(url)
    response.raise_for_status()
    data = response.json()
    with open("weather.json", "w") as file:
        json.dump(data, file)
    print(f"Temperature in {cityName} is: {data['main']['temp']-273.15:.2f}°C")

except RequestException as e:
    print("Error: Could not get data from the API.", str(e))