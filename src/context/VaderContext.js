import React, { createContext, useState } from "react";

export const VaderContext = createContext();

const url = "http://api.openweathermap.org/data/2.5/";
const weather = "weather?q=";
const forecast = "forecast?q=";
const appID = "&appid=a99f36f3bd9ba71efc117d49d0f48981";
const unit = "&units=metric";
// const lang = "&lang=se";

const VaderContextProvider = (props) => {
  const [vaderData, setVaderData] = useState();
  const [weekData, setWeekData] = useState();
  const [isError, setIsError] = useState(true);
  const [errorMessage, setErrorMessage] = useState("Fetching weather data");

  //Hämtar aktuell väder
  const fetchData = async (city) => {
    setIsError(true);
    setErrorMessage("Fetching weather data");
    await fetch(url + weather + city + appID + unit)
      .then((res) => res.json())
      .then((data) => {
        if (data.cod !== 200) {
          setIsError(true);
          setErrorMessage(data.message);
        } else {
          setVaderData(data);
          setIsError(false);
          setErrorMessage("Found weather data for " + city);
        }
        console.log("Väder JSON", data);
      })
      .catch((err) => console.log(err));
  };

  //Hämtar 5-dagars väder
  const fetchWeekData = async (city) => {
    await fetch(url + forecast + city + appID + unit)
      .then((res) => res.json())
      .then((data) => {
        if (data.cod !== "200") {
          setIsError(true);
          setErrorMessage(data.message);
        } else {
          setWeekData(data);
          setIsError(false);
          setErrorMessage("Found forecast data for " + city);
        }
        console.log("5-dagars JSON", data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <VaderContext.Provider
      value={[
        vaderData,
        fetchData,
        isError,
        errorMessage,
        weekData,
        fetchWeekData,
      ]}
    >
      {props.children}
    </VaderContext.Provider>
  );
};
export default VaderContextProvider;
