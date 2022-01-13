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
        const date = dayjs()
        // Do some processing
        let finalString = date.format('llll') // Provisory
        if(date.second() % 2) finalString = finalString.replace(':',' ')
        ref.current.innerHTML = finalString[0].toUpperCase() + finalString.slice(1)
    }
    interval.current = setInterval(update, 500) as any as number;
    return ()=>clearInterval(interval.current || 0)
  }, []);
  return React.createElement(tag, { ref, className, id }, "Clock");
};

export default Clock;
