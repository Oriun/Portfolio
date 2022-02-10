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
  const parsedUrl = new URL(uri);
  function reloadIframe() {
    if (!ref.current) return;
    // eslint-disable-next-line no-self-assign
    ref.current.src = ref.current.src;
  }
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
      Head={
        <div className="browser-head">
          {parsedUrl.protocol === "https" ? <Shield /> : <div />}
          <div className="browser-search-bar">
            {parsedUrl.hostname}
            <Redo onClick={reloadIframe} />
          </div>
        </div>
      }
      Content={
        <iframe
          src={url}
          ref={ref}
          title={project}
          key={winKey}
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
