import React from "react";
import { useIcones } from "src/hooks/useIcones";
import Config from 'src/Config.json';

type BookmarkProps = {
  name: string;
  path: string;
  icone: string;
  cd: (path: string) => void;
};
const Bookmark = ({ name, path, icone, cd }: BookmarkProps) => {
    const Icon = useIcones(icone)
  return (
    <div className="bookmark" onClick={() => cd(path)}>
      <Icon color={Config.ui.color.blue} />
      <span>{name}</span>
    </div>
  );
};

export default Bookmark;
