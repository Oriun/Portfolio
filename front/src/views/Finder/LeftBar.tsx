import React from "react";
import System from "src/contexts/System";
import Config from 'src/Config.json';
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
      <h4>Favoris</h4>
      {Config.finder.bookmarks.map((item: any)=><Bookmark {...item} cd={cd} key={item.name}/>)}
    </div>
  );
};

export default LeftBar;
