export type Rect = {
  left: number | string;
  top: number | string;
  width: number | string;
  height: number | string;
};

export type Window = {
  key: number;
  name: string;
  project: string;
  type: string;
  rect: Rect;
  status: "normal" | "minimize" | "full-screen" | "maximize";
};
