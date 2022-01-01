import React from "react";
import System from "src/contexts/System";
import "./appItem.scss";

type AppItemProps = {
  name: string;
  icone: string;
  mode: string;
};

const AppItem = ({ icone, mode, name }: AppItemProps): JSX.Element => {
  const isActive = System.useSystem<boolean>(data => data.activeProjects.has(name));
  const ref = React.useRef<HTMLDivElement>(null)
  React.useEffect(()=>{
    if(ref.current){
      ref.current.style.setProperty('--app_name', `"${name}"`)
    }
  },[])
  return (
    <div
      className={"app-item" + (isActive ? " active" : "")}
      style={{ backgroundImage: `url("${icone}")`, backgroundSize: mode }}
      onClick={() => System.openProject(name)}
      ref={ref}
    />
  );
};

export default AppItem;
