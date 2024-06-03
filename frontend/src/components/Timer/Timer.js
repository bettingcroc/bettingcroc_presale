import { useEffect, useMemo, useState } from "react";
import './Timer.css';

const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;

export const Timer = ({ deadline = new Date().toString() }) => {
  const parsedDeadline = useMemo(() => Date.parse(deadline), [deadline]);
  const [time, setTime] = useState(parsedDeadline - Date.now());

  useEffect(() => {
    const interval = setInterval(
      () => setTime(parsedDeadline - Date.now()),
      1000,
    );

    return () => clearInterval(interval);
  }, [parsedDeadline]);

  return (
    <div className="Timer">
      {window.innerWidth > 1080 ? Object.entries({
        Days: time / DAY,
        Hours: (time / HOUR) % 24,
        Minutes: (time / MINUTE) % 60,
        Seconds: (time / SECOND) % 60,
      }).map(([label, value]) => (
        <div key={label} className="timerBox">
          <p className="timerP">{`${Math.floor(value)}`.padStart(2, "0")}{" " + label}</p>
        </div>
      )) :


        <div className="timerBox">
          <div className="lineTimerBox">
            <p className="timerP">{`${Math.floor(time / DAY)}`.padStart(2, "0")}{" Days"}</p>
            <p className="timerP">{`${Math.floor((time / HOUR) % 24)}`.padStart(2, "0")}{" Hours"}</p>
          </div>
          <div className="lineTimerBox">
            <p className="timerP">{`${Math.floor((time / MINUTE) % 60)}`.padStart(2, "0")}{" Minutes"}</p>
            <p className="timerP">{`${Math.floor((time / SECOND) % 60)}`.padStart(2, "0")}{" Seconds"}</p>
          </div>
        </div>

      }
    </div>
  );
};
