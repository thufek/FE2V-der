import React, { useState, useContext, useEffect } from "react";
import { VaderContext } from "../context/VaderContext";
import WeekVaderList from "./WeekVaderList";

const Vader = () => {
  const [isDetails, setIsDetails] = useState(true);

  const [vaderData, , isError, , weekVaderData] = useContext(VaderContext);

  useEffect(() => {
    setIsDetails(false);
  }, [weekVaderData]);

  const checkVaderData = () => {
    if (isError || vaderData === undefined || weekVaderData === undefined) {
      return null;
    } else {
      return (
        <div className="m-0 p-0">
          <div
            className="card text-center text-white bg-dark mb-3 mt-0"
            style={{ width: 300 }}
          >
            <div className="card-header m-0 p-0">
              <h5 className="m-0 p-2">
                {vaderData === undefined
                  ? new Date(Date.now()).toLocaleString()
                  : new Date(Date.now()).toLocaleString()}
              </h5>
            </div>
            <div className="card-body text-white m-0 p-0">
              <h3 className="card-title text-white mt-3 p-0">
                {vaderData === undefined ? "City" : vaderData.name} ,
                {vaderData === undefined ? "CY" : " " + vaderData.sys.country}
              </h3>
              <h1 className="card-title text-white m-0 p-0">
                {vaderData === undefined
                  ? "0"
                  : Math.round(vaderData.main.temp) + " \xB0C"}
              </h1>
              <img
                src={
                  vaderData === undefined
                    ? "http://openweathermap.org/img/wn/03n@2x.png"
                    : vaderData.weather.map((i) => {
                        return (
                          "http://openweathermap.org/img/wn/" +
                          i.icon +
                          "@2x.png"
                        );
                      })
                }
                className="card-img p-0 m-0 mt-n5 mb-n5"
                alt="..."
              />
              <h5 className="card-title text-white p-0 m-0">
                {vaderData === undefined
                  ? "Main"
                  : vaderData.weather.map((i) => {
                      return i.main;
                    })}
              </h5>
            </div>
            <ul className="list-group list-group-flush bg-dark p-0 mt-0 text-white">
              <li className="list-group-item bg-dark p-0 pb-1 text-white">
                {vaderData === undefined
                  ? "Description"
                  : vaderData.weather.map((i) => {
                      return i.description;
                    })}
              </li>
              {showExtraDetails()}
            </ul>
            <div className="card-body text-white m-0 p-2">
              <button
                className="btn btn-success"
                onClick={() => setIsDetails(!isDetails)}
              >
                Detailed info
              </button>
            </div>
          </div>
          {showWeekVaderList()}
        </div>
      );
    }
  };

  const showExtraDetails = () => {
    if (isDetails) {
      return (
        <>
          {" "}
          <li className="list-group-item bg-danger m-0 p-1">
            {String.fromCharCode("8593") + " "}
            {vaderData === undefined
              ? "0"
              : Math.round(vaderData.main.temp_max) + " \xB0C"}
          </li>
          <li className="list-group-item bg-primary m-0 p-1">
            {String.fromCharCode("8595") + " "}
            {vaderData === undefined
              ? "0"
              : Math.round(vaderData.main.temp_min) + " \xB0C"}
          </li>
          <li className="list-group-item bg-dark m-0 p-1">
            {"Humidity: "}
            {vaderData === undefined ? "0" : vaderData.main.humidity + " %"}
          </li>
          <li className="list-group-item bg-dark m-0 p-1">
            {"Wind: "}
            {checkWindDegrees()}
            {vaderData === undefined ? "0" : vaderData.wind.speed + " \u33A7"}
          </li>
        </>
      );
    }
  };

  const showWeekVaderList = () => {
    if (isDetails && weekVaderData !== undefined) {
      return (
        <div className="card-group" style={{ width: 700 }}>
          <WeekVaderList />
        </div>
      );
    }
  };

  //Bestämmer vilken pil som ska visas baserat på vindens rikting
  function checkWindDegrees() {
    if (vaderData.wind.deg >= 23 && vaderData.wind.deg <= 67) {
      return <span>{String.fromCharCode("8599") + " "}</span>; //höger-upp
    } else if (vaderData.wind.deg >= 68 && vaderData.wind.deg <= 112) {
      return <span>{String.fromCharCode("8594") + " "}</span>; //höger
    } else if (vaderData.wind.deg >= 113 && vaderData.wind.deg <= 157) {
      return <span>{String.fromCharCode("8600") + " "}</span>; //höger-ner
    } else if (vaderData.wind.deg >= 158 && vaderData.wind.deg <= 202) {
      return <span>{String.fromCharCode("8595") + " "}</span>; //ner
    } else if (vaderData.wind.deg >= 203 && vaderData.wind.deg <= 247) {
      return <span>{String.fromCharCode("8601") + " "}</span>; //vänster-ner
    } else if (vaderData.wind.deg >= 248 && vaderData.wind.deg <= 292) {
      return <span>{String.fromCharCode("8592") + " "}</span>; //vänster
    } else if (vaderData.wind.deg >= 293 && vaderData.wind.deg <= 337) {
      return <span>{String.fromCharCode("8598") + " "}</span>; //vänster-upp
    } else {
      return <span>{String.fromCharCode("8593") + " "}</span>; //upp
    }
  }

  return <>{checkVaderData()}</>;
};

export default Vader;
