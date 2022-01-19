import "./App.css";
import React from "react";
import System from "./contexts/System";

/** Components **/
import Dock from "./components/Dock";
import Topbar from "./components/Topbar";
import Window from "./components/Window";
import Desktop from "./components/Desktop";

/** Views **/
import Browser from "./views/Browser";
import Finder from "./views/Finder";

const typeToCompoent: { [key: string]: (props: any) => JSX.Element } = {
  browser: Browser,
  finder: Finder,
};

const App = (): JSX.Element => {
  const { windows, background } = System.useSystem((data) => ({
    windows: data.activeWindows,
    background: data.background,
  }));
  console.log(windows, background);
  const WindowStack = React.useMemo(() => {
    return windows.map((win) => {
      const Component =
        win.type in typeToCompoent ? typeToCompoent[win.type] : Window;
      return <Component Head={win.name} winKey={win.key} {...win} />;
    });
  }, [windows]);
  return (
    <main style={{ backgroundImage: `url("${background}")` }} >
      <Topbar />
      <Desktop />
      {WindowStack}
      <Dock />
    </main>
  );
};

export default App;
