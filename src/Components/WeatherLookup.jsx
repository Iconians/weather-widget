import React from "react";

const WeatherLookup = ({ lookupNewLocation, updateSpeedType }) => {
  return (
    <>
      <div>
        <label htmlFor="cityLookup">Enter Zipcode</label>
        <input type="number" name="citylookup" onChange={lookupNewLocation} />
      </div>
      <div className="form-check form-check-inline">
        <select
          name="speedToggle"
          id="a"
          className="form-check-input"
          onChange={updateSpeedType}
          defaultChecked="mph"
        >
          <option value="mph">mph</option>
          <option value="kph">kph</option>
        </select>
      </div>
    </>
  );
};

export default WeatherLookup;
