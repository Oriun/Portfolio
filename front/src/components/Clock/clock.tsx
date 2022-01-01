import dayjs from "dayjs";
import React from "react";

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
        finalString = date.format('llll') // Provisory
        
        ref.current.innerHTML = finalString[0].toUpperCase() + finalString.slice(1)
    }
    interval.current = setInterval(update, 1000) as any as number;
    return ()=>clearInterval(interval.current || 0)
  }, []);
  return React.createElement(tag, { ref, className, id }, "Clock");
};

export default Clock;
