import React from "react";
import { debounce } from "src/utils/debounce";

type coord = { x: number; y: number };
type UseMoveCallback = (v: coord) => void;

export const useMove = <T extends HTMLElement>(
  callback?: UseMoveCallback,
  onEnd?: UseMoveCallback,
  debounceMs = 30
) => {
  const ref = React.useRef<T | null>(null);
  const [activated, setA] = React.useState(false);
  const lastClick = React.useRef<coord | null>(null);
  React.useEffect(() => {
    let reffed = ref.current !== null;
    if (+reffed ^ +activated) setA(reffed);
  }, [ref, activated]);

  React.useEffect(() => {
    if (!activated || !(callback || onEnd) || !ref.current) return;
    const element = ref.current as HTMLElement;

    function send(event: MouseEvent) {
      console.log('move')
      const { x, y } = lastClick.current!;
      const translation = { x: event.clientX - x, y: event.clientY - y };
      callback?.(translation);
    }
    const move = debounce(send, debounceMs);
    function end(event: MouseEvent) {
      window.removeEventListener("mousemove", move);
      document.body.style.removeProperty('--window-transition-duration')
      if (onEnd) {
        const { x, y } = lastClick.current!;
        const translation = { x: event.clientX - x, y: event.clientY - y };
        onEnd(translation);
      } else send(event);
      lastClick.current = null;
    }
    function start(event: MouseEvent) {
      console.log('start')
      lastClick.current = { x: event.clientX, y: event.clientY };
      window.addEventListener("mouseup", end);
      window.addEventListener("mousemove", move);
      document.body.style.setProperty('--window-transition-duration',(debounceMs / 1000)+'s')
    }
    if (lastClick.current) {
      window.addEventListener("mouseup", end);
      window.addEventListener("mousemove", move);
    } else {
      element.addEventListener("mousedown", start);
    }

    return () => {
      element.removeEventListener("mousedown", start);
      window.removeEventListener("mouseup", end);
      window.removeEventListener("mousemove", move);
      // document.body.style.removeProperty('--window-transition-duration')
    };
  }, [callback, activated, onEnd, debounceMs]);
  return ref;
};
