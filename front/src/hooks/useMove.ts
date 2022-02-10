import React from "react";
import { debounce } from "src/utils/debounce";

type coord = { x: number; y: number };
type UseMoveCallback = (v: coord) => void;

export const useMove = <T extends HTMLElement>(
  callback: UseMoveCallback,
  onEnd?: UseMoveCallback
) => {
  const ref = React.useRef<T | null>(null);
  const [activated, setA] = React.useState(false);
  const lastClick = React.useRef<coord | null>(null);
  React.useEffect(() => {
    let reffed = ref.current !== null;
    if (+reffed ^ +activated) setA(reffed);
  }, [ref, activated]);

  React.useEffect(() => {
    if (!activated || !callback || !ref.current) return;
    const element = ref.current as HTMLElement;

    function send(event: MouseEvent) {
      const { x, y } = lastClick.current!;
      const translation = { x: event.clientX - x, y: event.clientY - y };
      callback(translation);
    }
    const move = debounce(send, 100);
    function end(event: MouseEvent) {
      console.log('ENded')
      window.removeEventListener("mousemove", move);
      if (onEnd) {
        const { x, y } = lastClick.current!;
        const translation = { x: event.clientX - x, y: event.clientY - y };
        onEnd(translation);
      } else send(event);
      lastClick.current = null;
    }
    function start(event: MouseEvent) {
      lastClick.current = { x: event.clientX, y: event.clientY };
      window.addEventListener("mouseup", end, { once: true });
      window.addEventListener("mousemove", move);
    }
    if (lastClick.current) {
      window.addEventListener("mouseup", end, { once: true });
      window.addEventListener("mousemove", move);
    } else element.addEventListener("mousedown", start, { once: true });

    return () => {
      element.removeEventListener("mousedown", start);
      window.removeEventListener("mouseup", end);
      window.removeEventListener("mousemove", move);
    };
  }, [callback, activated, onEnd]);
  return ref;
};
