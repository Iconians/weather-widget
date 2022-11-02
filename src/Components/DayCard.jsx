import React from "react";
import moment from "moment";

const DayCard = ({ data, degreeType, speedType }) => {
  const { temp, dt, imgId, desc, windSpeed, feelsLike, humidity } = data;
  const newDate = new Date();
  newDate.setTime(dt * 1000);
  const icon = `owf owf-${imgId} owf-5x `;
  const feelsLikeFah = Math.round(feelsLike);
  const feelsLikeCel = Math.round((feelsLikeFah - 32) * (5 / 9));
  const fahrenheit = Math.round(temp);
  const celsius = Math.round((fahrenheit - 32) * (5 / 9));
  const speedmph = Math.round(windSpeed);
  const speedkph = Math.round(speedmph * 1.609);
  return (
    <div className="col-sm-2">
      <div className="card">
        <h3 className="card-title">{moment(newDate).format("dddd")}</h3>
        <p className="text-muted">
          {moment(newDate).format("MMMM Do, h:mm a")}
        </p>
        <i className={icon} />
        <h2>
          {degreeType === "celsius" ? `${celsius} °C` : `${fahrenheit} °F`}
        </h2>
        <div className="card-body">
          <p className="card-text">
            {desc} <br />
            {degreeType === "celsius"
              ? `Feels like ${feelsLikeCel} °C`
              : `Feels like ${feelsLikeFah} °F`}{" "}
            <br />
            {speedType === "kph"
              ? `Wind ${speedkph} kph`
              : `Wind ${speedmph} mph`}{" "}
            <br />
            {`Humidity ${humidity}%`}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DayCard;
