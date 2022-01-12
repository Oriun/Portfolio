import React from "react";
import System from "src/contexts/System";
import { useAction } from "src/hooks/useAction";
import "./dockItem.scss";

type AppItemProps = {
  name: string;
  icone: string;
  background: string;
  action: string;
  options: any;
};

const AppItem = ({ icone, background, name, action, options }: AppItemProps): JSX.Element => {
  const isActive = System.useSystem<boolean>(data => data.activeProjects.has(name));
  const ref = React.useRef<HTMLDivElement>(null)
  const doAction = useAction(action, options)
  React.useEffect(()=>{
    if(ref.current){
      ref.current.style.setProperty('--app_name', `"${name}"`)
    }
  },[name])
  return (
    <div
      className={"app-item" + (isActive ? " active" : "")}
      style={{ backgroundImage: `url("${icone}")`, backgroundColor: background }}
      onClick={doAction}
      ref={ref}
    />
  );
};

export default AppItem;
