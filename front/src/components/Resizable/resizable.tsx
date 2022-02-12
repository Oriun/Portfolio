import React from "react";
import { Rect } from "src/types";
import { debounce } from "src/utils/debounce";
import "./resizable.scss";

type Borders = "left" | "right" | "bottom";
type ResizableProps = {
  tag?: string;
  className?: string;
  id?: string;
  children: React.ReactElement;
  rect: Rect;
  activated: boolean;
  onResize: (r: Rect) => void;
  [key: string]: any;
};
const Resizable: React.FC<ResizableProps> = ({
  className,
  rect,
  id,
  tag,
  children,
  activated,
  onResize,
  ...props
}) => {
  const [BorderRef, setBorderRef] = React.useState<Borders | null>(null);
  const [size, setSize] = React.useState<Rect>(rect);
  React.useEffect(() => {
    // for (const p of Object.keys(size) as (keyof Rect)[]) {
    //   if (size[p] !== rect[p]) {
        setSize(rect);
    //     break;
    //   }
    // }
  }, [rect]);
  React.useEffect(() => {
    if (activated && BorderRef) {
      const onMouseMove = debounce(function (event: MouseEvent) {
        const { clientY, clientX } = event;
        switch (BorderRef) {
          case "left":
            setSize({ ...rect, left: clientX });
            break;
          case "right":
            setSize({ ...rect, right: window.innerWidth - clientX });
            break;
          case "bottom":
            setSize({ ...rect, bottom: window.innerHeight - clientY });
            break;
          default:
            break;
        }
      }, 30);
      function reset() {
        onResize(size);
        setBorderRef(null);
      }
      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseup", reset, { once: true });
      return () => {
        window.removeEventListener("mousemove", onMouseMove);
        window.removeEventListener("mouseup", reset);
      };
    }
  }, [rect, activated, BorderRef, onResize, setSize, size]);
  const wrap = React.useCallback(
    function (...c: React.ReactNode[]): JSX.Element {
      return React.createElement(
        tag || "div",
        {
          ...props,
          id,
          style: size,
          className: "resizable " + className,
          tag: undefined,
          children: undefined,
        },
        c
      );
    },
    [className, size, id, tag, props]
  );
  return wrap(
    <div
      key={1}
      className="resizable-border"
      onMouseDown={() => setBorderRef("left")}
    />,
    <div
      key={2}
      className="resizable-border"
      onMouseDown={() => setBorderRef("right")}
    />,
    <div
      key={3}
      className="resizable-border"
      onMouseDown={() => setBorderRef("bottom")}
    />,
    React.cloneElement(children, { key: 4 })
  );
};

export default Resizable;
