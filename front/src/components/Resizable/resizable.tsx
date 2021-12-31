import React from "react";
import "./resizable.scss";

type ResizableProps = {
  tag?: string;
  className?: string;
  id?: string;
  ref?: string;
  children: React.ReactNode[];
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
      ...c
    );
  };
  return wrap(
    <div className="resizable-border" />,
    <div className="resizable-border" />,
    <div className="resizable-border" />,
    ...prop.children
  );
};

export default Resizable;
