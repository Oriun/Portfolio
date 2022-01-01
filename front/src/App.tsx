import React from "react";
import "./App.css";
import Dock from "./components/Dock";
import Topbar from "./components/Topbar";
import Window from "./components/Window";
import Config from "./Config.json";
import System from "./contexts/System";

const App = (): JSX.Element => {
  const { windows, background } = System.useSystem((data) => ({
    windows: data.activeWindows,
    background: data.background,
  }));
  console.log(windows, background);
  React.useEffect(() => {
    setTimeout(() => {
      // System.changeBackground(Config.ui.background.available.at(-1)!)
    }, 5_000);
  }, []);
  const WindowStack = React.useMemo(() => {
    return windows.map(win => (
      <Window
        Head={win.name}
        rect={win.rect}
        key={win.key}
        winKey={win.key}
      />
    ));
  }, [windows]);
  return (
    <main style={{ backgroundImage: `url("${background}")` }}>
      <Topbar />
      {WindowStack}
      <Dock />
    </main>
  );
};

export default App;
