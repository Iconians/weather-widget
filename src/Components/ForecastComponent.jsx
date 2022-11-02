import React from "react";
import DayCard from "./DayCard";
import DegreeToggle from "./DegreeToggle";
import { WEATHER_API, WEATHER_URL, WEATHER_URL2 } from "../constants";
import WeatherLookup from "./WeatherLookup";
import WeatherService from "../services";

const weather = new WeatherService();
class ForecastComponent extends React.Component {
  state = {
    data: [],
    loading: false,
    error: false,
    city: "",
    country: "",
    degreeType: "fahrenheit",
    speedType: "mph",
    zip: "",
  };
  async componentDidMount() {
    this.setState({ loading: true });
    weather.fetchFiveDayForecast().then(
      (res) => {
        if (res && res.response.ok) {
          this.setState({
            data: res.data,
            loading: false,
          });
        } else {
          this.setState({ loading: false });
        }
      },
      (error) => {
        console.log(error);
        this.setState({
          loading: false,
          error: true,
        });
      }
    );
  }

  //     try {
  //       const response = await fetch(
  //         `${WEATHER_URL}${zip}${WEATHER_URL2}${WEATHER_API}`
  //       );
  //       if (response.ok) {
  //         const json = await response.json();
  //         const data = json.list
  //           .filter((day) => day.dt_txt.includes("00:00:00"))
  //           .map((item) => ({
  //             temp: item.main.temp,
  //             feelsLike: item.main.feels_like,
  //             dt: item.dt,
  //             date: item.dt_txt,
  //             humidity: item.main.humidity,
  //             imgId: item.weather[0].id,
  //             desc: item.weather[0].description,
  //             windSpeed: item.wind.speed,
  //           }));
  //         this.setState({
  //           data,
  //           loading: false,
  //           city: json.city.name,
  //           country: json.city.country,
  //         });
  //       } else {
  //         this.setState({
  //           loading: false,
  //           error: true,
  //         });
  //       }
  //     } catch (err) {
  //       console.error("there was an error", err);
  //     }
  //   }
  // }

  async updateForecast(zip) {
    if (zip.length === 5) {
      this.setState({ loading: true });
      try {
        const response = await fetch(
          `${WEATHER_URL}${zip}${WEATHER_URL2}${WEATHER_API}`
        );
        if (response.ok) {
          const json = await response.json();
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
          this.setState({
            data,
            loading: false,
            city: json.city.name,
            country: json.city.country,
          });
        } else {
          this.setState({
            loading: false,
            error: true,
          });
        }
      } catch (err) {
        console.error("there was an error", err);
      }
    }
  }

  updateForecastDegree = ({ target: { value } }) =>
    this.setState({ degreeType: value });

  updateSpeedType = ({ target: { value } }) =>
    this.setState({ speedType: value });

  lookupNewLocation = ({ target: { value } }) => {
    this.setState({ zip: value });
    console.log(value);
    this.updateForecast(value);
  };

  render() {
    const { loading, error, data, degreeType, speedType, city, country } =
      this.state;
    return (
      <div className="container mt-5">
        <div className="display-1 jumbotron">5-day Forecast</div>
        <h5 className="display-5 text-muted">{`${city} ${country}`}</h5>
        <WeatherLookup
          lookupNewLocation={this.lookupNewLocation}
          updateSpeedType={this.updateSpeedType}
        />
        <DegreeToggle
          updateForecastDegree={this.updateForecastDegree}
          degreeType={degreeType}
        />
        <div className="row justify-content-center">
          {!loading ? (
            data.map((item) => (
              <DayCard
                data={item}
                key={item.dt}
                degreeType={degreeType}
                speedType={speedType}
              />
            ))
          ) : (
            <div>Loading...</div>
          )}
        </div>
        {error && <h3 className="text-danger">Error Loading data</h3>}
      </div>
    );
  }
}

export default ForecastComponent;
