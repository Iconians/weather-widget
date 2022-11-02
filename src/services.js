import { WEATHER_URL, WEATHER_URL2, WEATHER_API } from "./constants";

class WeatherService {
  async fetchFiveDayForecast(zip) {
    return new Promise(async (success, fail) => {
     try {
      const response = await fetch(`${WEATHER_URL}${zip}${WEATHER_URL2}${WEATHER_API}`)
      if (response.ok) {
        const json = await response.json()
        const data = json.list
        .filter((day) => day.dt_txt.includes("00:00:00"))
        .map((item) => ({
          temp: item.main.temp,
          feelsLike: item.main.feels_like,
          dt: item.dt,
          date: item.dt_txt,
          humidity: item.main.humidity,
          imgId: item.weather[0].id,
          desc: item.weather[0].description,
          windSpeed: item.wind.speed,
        }));
        const city = json.city.name
        const country = json.city.country
        success( {response, data, city, country})
      }else {
        fail({error: "invalid http request"})
      }
     } catch(error) {
       fail(error)
     }
    } )
  }
}

export default WeatherService