import React from "react";
import "./App.css";
import Dock from "./components/Dock";
import Topbar from "./components/Topbar";
import Window from "./components/Window";
import Config from "./Config.json";

const App = (): JSX.Element => {
  console.log(Config);
  const [backgroundImage, setBG] = React.useState(Config.ui.background.default);
  return (
    <main style={{ backgroundImage: `url("${backgroundImage}")` }}>
      <Topbar />
      <Window />
      <Dock />
    </main>
  );
};

export default App;
