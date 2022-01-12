import React from "react";
import { useAction } from "src/hooks/useAction";
import { ActionOptions } from "src/types";
import "./desktopItem.scss";

type DesktopItemProps = {
  pos: {
    x: number;
    y: number;
  };
  image: string;
  name: string;
  action: string;
  options: ActionOptions | ActionOptions[];
};

const DesktopItem = ({ pos, image, name, action, options }: DesktopItemProps): JSX.Element => {
  const doAction = useAction(action, options)
  return (
    <div
      className="desktop-item"
      style={{
        gridRow: `${pos.y}/${pos.y + 1}`,
        gridColumn: `${pos.x}/${pos.x + 1}`,
      }}
      onDoubleClick={doAction}
    >
      <img src={image} alt="" />
      <h6>{name}</h6>
    </div>
  );
};

export default DesktopItem;
