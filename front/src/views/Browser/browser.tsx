import React from "react";
import Window from "src/components/Window";
import { Rect, WindowStatus } from "src/types";
import { ReactComponent as Shield } from "src/assets/shield.svg";
import { ReactComponent as Redo } from "src/assets/redo.svg";
import "./browser.scss";

type BrowserProps = {
  project: string;
  rect: Rect;
  winKey: number;
  url?: string;
  status: WindowStatus;
  [key: string]: any;
};

const Browser = ({ rect, winKey, url, project, status }: BrowserProps) => {
  console.log(winKey);
  const ref = React.useRef<HTMLIFrameElement>(null);
  if (url) {
    const parsedUrl = new URL(url);
    function reloadIframe() {
      if (!ref.current) return;
      // eslint-disable-next-line no-self-assign
      ref.current.src = ref.current.src;
    }
    return (
      <Window
        rect={rect}
        winKey={winKey}
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
            allow="fullscreen"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        }
      />
    );
  } else {
    return <Window rect={rect} winKey={winKey} status={status} />;
  }
};

export default Browser;
