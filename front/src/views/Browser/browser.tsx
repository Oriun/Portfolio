import React, { SyntheticEvent } from "react";
import Window from "src/components/Window";
import { Rect, WindowStatus } from "src/types";
import { ReactComponent as Shield } from "src/assets/shield.svg";
import { ReactComponent as Redo } from "src/assets/redo.svg";
import "./browser.scss";
import { useMove } from "src/hooks/useMove";
import { resizeWindow } from "src/contexts/System/actions";

function translate(vector: { x: number; y: number }, rect: Rect) {
  return {
    top: +rect.top + vector.y,
    bottom: +rect.bottom - vector.y,
    left: +rect.left + vector.x,
    right: +rect.right - vector.x,
  };
}

type SearchBarProps = {
  uri: string;
  goTo: (newUrl: string) => void;
};

type SearchbarFormEvent = React.FormEvent<HTMLFormElement> & {
  target: React.FormEvent<HTMLFormElement>["target"] & {
    0: { value: string };
  };
};

const SearchBar = ({ uri, goTo }: SearchBarProps) => {
  const parsed = new URL(uri);
  const [searchMode, setMode] = React.useState<boolean>(false);
  function submit(e: SearchbarFormEvent) {
    e.preventDefault();
    e.stopPropagation();
    const new_url = e.target[0].value;
    goTo(new_url);
  }
  return (
    <div
      className="browser-head"
      onClick={() => setMode((a) => !a)}
      onDoubleClick={(e) => e.stopPropagation()}
    >
      {parsed.protocol === "https" ? <Shield /> : <div />}
      {searchMode ? (
        <form
          className="browser-search-bar"
          onSubmit={submit}
          onClick={(e) => e.stopPropagation()}
        >
          <input type="text" />
          <Redo onClick={() => goTo(uri)} />
        </form>
      ) : (
        <div className="browser-search-bar">
          {parsed.hostname}
          <Redo onClick={() => goTo(uri)} />
        </div>
      )}
    </div>
  );
};

type BrowserProps = {
  project: string;
  rect: Rect;
  winKey: number;
  url?: string;
  status: WindowStatus;
  [key: string]: any;
};

const Browser = ({
  rect,
  winKey,
  url = "https://bing.com/",
  project,
  status,
}: BrowserProps) => {
  const ref = React.useRef<HTMLIFrameElement>(null);
  const [uri, setUri] = React.useState(url);
  const [size, setSize] = React.useState(rect);
  React.useEffect(() => {
    // for (const p of Object.keys(size) as (keyof Rect)[]) {
    //   if (size[p] !== rect[p]) {
    setSize(rect);
    //     break;
    //   }
    // }
  }, [rect]);
  const moveRef = useMove(
    (vec) => setSize(translate(vec, rect)),
    (vec) => resizeWindow(winKey, translate(vec, rect))
  );
  
  return (
    <Window
      rect={size}
      winKey={winKey}
      key={winKey}
      className="browser"
      status={status}
      Head={<SearchBar uri={uri} goTo={setUri} />}
      Content={
        <iframe
          src={uri}
          ref={ref}
          title={project}
          key={winKey+uri}
          allow="fullscreen"
          referrerPolicy="strict-origin-when-cross-origin"
        />
      }
      ref={(r) => {
        moveRef.current = r?.head.current;
      }}
    />
  );
};

export default Browser;
