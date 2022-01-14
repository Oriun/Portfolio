import React from "react";
import Window from "src/components/Window";
import System from "src/contexts/System";
import { Rect, WindowStatus } from "src/types";
import "./Finder.scss";
import LeftBar from "./LeftBar";

type FinderProps = {
  project: string;
  rect: Rect;
  winKey: number;
  status: WindowStatus;
  path?: string;
  [key: string]: any;
};

const Finder = ({ rect, winKey, project, status, path }: FinderProps) => {
  function cd(newPath: string) {
    System.updateWindow(winKey, { path: newPath });
  }
  return (
    <Window
      rect={rect}
      winKey={winKey}
      Head={false}
      className="finder"
      status={status}
      Content={
        <>
          <LeftBar winKey={winKey} cd={cd} />
          <div className="finder-main">
            This is a Finder Window from path {path || "no path"}
          </div>
        </>
      }
    />
  );
};

export default Finder;
