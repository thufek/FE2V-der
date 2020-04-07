import React from "react";
import "./App.css";
import Vader from "./components/Vader";
import Search from "./components/Search";

const App = () => {
  return (
    <div className="container justify-content-center" style={{ width: 700 }}>
      <Search />
      <Vader />
    </div>
  );
};

export default App;
