import React from "react";
import System from "src/contexts/System";
import Config from "src/Config.json";
import Bookmark from "./Bookmark";

type LeftBarProps = {
  winKey: number;
  cd: (path: string) => void;
};

const $ = (e: React.MouseEvent) => e.stopPropagation();

const LeftBar = ({ winKey, cd }: LeftBarProps) => {
  return (
    <div className="finder-left-bar">
      <div className="buttons" onClick={$}>
        <div onClick={() => System.closeWindow(winKey)} />
        <div onClick={() => System.minimize(winKey)} />
        <div onClick={() => System.goFullScreen(winKey)} />
      </div>
      {Config.finder.bookmarkGroup.map((group) => {
        return (
          <div className="bookmark-group" key={group.name}>
            <h4>{group.name}</h4>
            {group.bookmarks.map((item: any) => (
              <Bookmark {...item} cd={cd} key={item.name} />
            ))}
          </div>
        );
      })}
      <div className="bookmark-group">
        <h4>Git</h4>
        <Bookmark name="Github" path="github://" cd={cd} icone="icone:fa/FaGithub" />
      </div>
    </div>
  );
};

export default LeftBar;
