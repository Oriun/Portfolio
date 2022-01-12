import React from "react";
import Resizable from "../Resizable";
import "./window.scss";
import { Rect, WindowStatus } from "src/types";
import System from "src/contexts/System";

type WindowProps = {
  Head?: React.ReactNode | false;
  Content?: React.ReactNode;
  Actions?: React.ReactNode;
  rect: Rect;
  winKey: number;
  children?: React.ReactNode;
  className?: string;
  status: WindowStatus;
  [key: string]: any;
};

const DefaultContent = (): JSX.Element => {
  return (
    <div
      style={{ width: "100%", height: "100%", backgroundColor: "#0084ff" }}
    />
  );
};

const $ = (e: React.MouseEvent) => e.stopPropagation();

const Window = ({
  Head = "New Window",
  Content,
  Actions,
  rect,
  winKey,
  children,
  className = " ",
  status,
}: WindowProps) => {
  console.log("status", winKey, status);
  let actualRect;
  switch (status) {
    case "full-screen":
    case "maximize":
      actualRect = {
        top: 0,
        left: 0,
        bottom: 0.1,
        right: 0.1,
      };
      break;
    default:
      actualRect = rect;
      break;
  }
  return (
    <Resizable
      tag="article"
      className={"window " + className}
      style={{ ...actualRect }}
    >
      {Head !== false && <div
        className={"window-head" + (status === "full-screen" ? " mobile" : "")}
        onDoubleClick={() => System[status === "normal" ? "maximise" : "normalSize"](winKey)}
      >
        <div className="window-button" onClick={$}>
          <div onClick={() => System.closeWindow(winKey)} />
          <div onClick={() => System.minimize(winKey)} />
          <div onClick={() => System.goFullScreen(winKey)} />
        </div>
        <div className="window-head-main" onClick={$}>
          {Head}
        </div>
        <div className="window-action" onClick={$}>
          {Actions}
        </div>
      </div>}
      {Content || children || <DefaultContent />}
    </Resizable>
  );
};

export default Window;
