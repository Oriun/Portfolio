import React from "react";
import Resizable from "../Resizable";
import "./window.scss";
import { Rect } from '../../types';
import System from 'src/contexts/System';

type WindowProps = {
  Head?: React.ReactNode;
  Content?: React.ReactNode;
  Actions?: React.ReactNode;
  rect: Rect,
  winKey: number
};

const DefaultContent = (): JSX.Element => {
  return (
    <div style={{ width: "100%", height: "100%", backgroundColor: "#0084ff" }} />
  );
};

const Window = ({
  Head = "New Window",
  Content = <DefaultContent />,
  Actions,
  rect,
  winKey
}: WindowProps) => {
  return (
    <Resizable tag="article" className="window" style={{ ...rect }}>
      <div className="window-head">
          <div className="window-button">
              <div onClick={()=>System.closeWindow(winKey)}/>
              <div/>
              <div/>
          </div>
          <div className="window-head-main">
          {Head}
          </div>
          <div className="window-action">
              {Actions}
          </div>
      </div>
      {Content}
    </Resizable>
  );
};

export default Window;
