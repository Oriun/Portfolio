import React from "react";
import Resizable from "../Resizable";
import "./window.scss";

type WindowProps = {
  Head?: React.ReactNode;
  Content?: React.ReactNode;
  Actions?: React.ReactNode;
};

const DefaultContent = (): JSX.Element => {
  return (
    <div style={{ width: "100%", height: "100%", backgroundColor: "#0084ff" }} />
  );
};

const Window = ({
  Head = "New Window",
  Content = <DefaultContent />,
  Actions
}: WindowProps) => {
  return (
    <Resizable tag="article" className="window" style={{ top: 120, left: 180, bottom: 128, right: 180 }}>
      <div className="window-head">
          <div className="window-button">
              <div/>
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
