import dayjs from "dayjs";
import React from "react";
import "./clock.scss";

type ClockProps = {
  tag?: string;
  className?: string;
  id?: string
};

const Clock = ({ tag = "span", className, id }: ClockProps) => {
  const ref = React.useRef<HTMLElement>(null);
  const interval = React.useRef<number | null>(null);
  React.useEffect(() => {
    function update() {
        if(!ref.current) return 
        let finalString = ''
        const date = dayjs()
        // Do some processing
        finalString = date.format('ddd MMM YY[&nbsp;&nbsp;&nbsp;]LT') // Provisory
        
        ref.current.innerHTML = finalString
    }
    interval.current = setInterval(update, 1000) as any as number;
    return ()=>clearInterval(interval.current || 0)
  }, []);
  return React.createElement(tag, { ref, className, id }, "Clock");
};

export default Clock;
