import { useState, useEffect, createElement } from "react";
import "./App.scss";

// import iconsList from "./icons.js";

import * as BiIcons from "react-icons/bi";

console.clear();

const biIconsList = Object.keys(BiIcons);
const iconsList = biIconsList
  .map((e) => {
    return { icon: e, random: Math.random() };
  })
  .sort((a, b) => a.random - b.random)
  .map((e) => e.icon)
  .splice(0, 9);

const App = () => {
  return (
    <div className="app">
      {iconsList.map((e, i) => {
        const RenderComponent = BiIcons[e];
        return (
          <div key={i} style={{ zoom: 4 }}>
            <RenderComponent />
          </div>
        );
      })}
    </div>
  );
};

export default App;
