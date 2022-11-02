import { WEATHER_URL, WEATHER_URL2, WEATHER_API } from "./constants";

class WeatherService {
  async fetchFiveDayForecast() {
    return new Promise(async (success, fail) => {
     try {
      const response = await fetch(`${WEATHER_URL}99207${WEATHER_URL2}${WEATHER_API}`)
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
        success( {response, data})
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