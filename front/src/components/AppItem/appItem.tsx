import React from "react";
import "./appItem.scss";

type AppItemProps = {
  active?: boolean;
  name: string;
  icone: string;
};

const AppItem = ({ active, icone }: AppItemProps): JSX.Element => {
  return <div className={"app-item" + (active ? " active" : "")} style={{ backgroundImage: `url("${icone}")`}}></div>;
};

export default AppItem;
