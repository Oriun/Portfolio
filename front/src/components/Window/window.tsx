import React from "react";
import Resizable from "../Resizable";
import "./window.scss";
import { Rect, WindowStatus } from "src/types";
import System from "src/contexts/System";
import { resizeWindow, sendWinfowToFront } from "src/contexts/System/actions";
import { useIsFront } from "src/contexts/System/hook";

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
type WindowRefs = {
  head: React.RefObject<HTMLDivElement>;
};

const DefaultContent = (): JSX.Element => {
  return (
    <div
      style={{ width: "100%", height: "100%", backgroundColor: "#0084ff" }}
    />
  );
};

const $ = (e: React.MouseEvent) => e.stopPropagation();

const Window = (
  {
    Head = "New Window",
    Content,
    Actions,
    rect,
    winKey,
    children,
    className = " ",
    status,
  }: WindowProps,
  ref: React.ForwardedRef<WindowRefs | null>
) => {
  
  const isFront = useIsFront(winKey)
  console.log("status", winKey, status, isFront);
  const headRef = React.useRef<HTMLDivElement>(null);

  React.useImperativeHandle(ref, () => ({
    get head() {
      return headRef;
    },
  }));

  let actualRect: Rect;
  let activated = false;
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
    case "minimize":
      console.log("min");
      return <></>;
    default:
      actualRect = rect;
      activated = true;
      break;
  }
  const size = {
    width:
      window.innerWidth -
      (actualRect.left as number) -
      (actualRect.right as number),
    height:
      window.innerHeight -
      (actualRect.top as number) -
      (actualRect.bottom as number),
  };
  return (
    <Resizable
      tag="article"
      // className={"window " + className}
      activated={activated}
      rect={actualRect}
      onResize={(r: Rect) => resizeWindow(winKey, r)}
      onMouseDown={isFront ? undefined : ()=>sendWinfowToFront(winKey)}
    >
      <div className={"window " + className} style={{ ...size }}>
        {Head !== false && (
          <div
            className={
              "window-head" + (status === "full-screen" ? " mobile" : "")
            }
            onDoubleClick={() =>
              System[status === "normal" ? "maximise" : "normalSize"](winKey)
            }
            ref={headRef}
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
          </div>
        )}
        {Content || children || <DefaultContent />}
      </div>
    </Resizable>
  );
};

export default React.forwardRef<any, WindowProps>(Window);
