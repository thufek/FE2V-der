import React, { useContext } from "react";
import { VaderContext } from "../context/VaderContext";
import WeekVader from "./WeekVader";

const WeekVaderList = () => {
  const [, , , , weekData, ,] = useContext(VaderContext);

  return weekData.list
    .filter(
      (d) =>
        d.dt_txt.includes("12:00:00") &&
        !d.dt_txt.includes(new Date().toISOString().slice(0, 10))
    )
    .map((d, i) => {
      return <WeekVader key={i} data={d}></WeekVader>;
    });
};

export default WeekVaderList;
