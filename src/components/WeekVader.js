import React, { useState, useEffect } from "react";

const WeekVader = (props) => {
  const [weekDay, setWeekDay] = useState();

  useEffect(() => {
    convertToweekday();
  }, []);

  function convertToweekday() {
    const date = new Date(props.data.dt_txt.slice(0, 10));

    dayOfWeekAsString(date.getDay());
  }

  function dayOfWeekAsString(dayIndex) {
    setWeekDay(() => {
      return [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ][dayIndex];
    });
  }

  return (
    <div className="card text-center" style={{ width: 150 }}>
      <div className="card-header m-0 p-0">
        {weekDay === undefined ? "Weekday" : weekDay}
      </div>
      <div className="card-body text-white bg-dark m-0 p-0">
        <h3 className="card-title m-0 mt-3 p-0">
          {props.data === undefined
            ? "0"
            : Math.round(props.data.main.temp) + " \xB0C"}
        </h3>
        <img
          className="card-img-top mt-n4 mb-n4 p-0"
          src={
            "http://openweathermap.org/img/wn/" +
            props.data.weather[0].icon +
            "@2x.png"
          }
          alt="Card cap"
        />
        <ul className="list-group list-group-flush bg-dark p-0 mt-0">
          <li className="list-group-item bg-dark p-0 pb-1">
            {props.data === undefined
              ? "Description"
              : props.data.weather[0].main}
          </li>
          {/*           <li className="list-group-item bg-dark p-0 pb-1">
            {props.data === undefined
              ? "Max: 0"
              : "Max: " + props.data.main.temp_max}
          </li>
          <li className="list-group-item bg-dark p-0 pb-1">
            {props.data === undefined
              ? "Min: 0"
              : "Min: " + props.data.main.temp_min}
          </li> */}
        </ul>
      </div>
      <div className="card-footer m-0 p-0">
        <small className="text-muted m-0 p-0">{props.data.dt_txt}</small>
      </div>
    </div>
  );
};

export default WeekVader;
