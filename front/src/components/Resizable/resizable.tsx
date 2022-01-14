import React from "react";
import "./resizable.scss";

type ResizableProps = {
  tag?: string;
  className?: string;
  id?: string;
  ref?: string;
  children: React.ReactElement;
  [key: string]: any;
};
const Resizable = (prop: ResizableProps): JSX.Element => {
  const wrap = function (...c: React.ReactNode[]): JSX.Element {
    return React.createElement(
      prop.tag || "div",
      {
        ...prop,
        className: "resizable " + prop.className,
        tag: undefined,
        children: undefined,
      },
      c
    );
  };
  return wrap(
    <div className="resizable-border" key={1} />,
    <div className="resizable-border" key={2} />,
    <div className="resizable-border" key={3} />,
    React.cloneElement(prop.children, { key: 4 })
  );
};

export default Resizable;
