export type CSSValue = number | string;

export type Rect = {
  left: CSSValue;
  top: CSSValue;
  bottom: CSSValue;
  right: CSSValue;
};

export type WindowStatus = "normal" | "minimize" | "full-screen" | "maximize";

export type Window = {
  key: number;
  name: string;
  project: string;
  type: string;
  rect: Rect;
  status: WindowStatus;
  [key:string]: any;
};

export type ActionOptions = null | { [key: string]: any };
