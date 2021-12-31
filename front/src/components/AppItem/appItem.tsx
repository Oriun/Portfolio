import React from "react";
import "./appItem.scss";

type AppItemProps = {
  active?: boolean;
  name: string;
  icone: string;
  mode: string;
};

const AppItem = ({ active, icone, mode }: AppItemProps): JSX.Element => {
  return <div className={"app-item" + (active ? " active" : "")} style={{ backgroundImage: `url("${icone}")`, backgroundSize: mode}}></div>;
};

export default AppItem;
