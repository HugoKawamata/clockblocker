import { useState, useEffect } from "react"
import "./App.css"
import { DateTime } from "luxon"
import Clock from "./components/Clock"


function App() {
  const [time, setTime] = useState(DateTime.now());

  useEffect(() => {
    const interval = setInterval(() => setTime(DateTime.now()), 10000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const secondsPastMidnight = time.toSeconds() - time.startOf("day").toSeconds()

  return (
    <div id="main">
      <Clock amOrPm="am" secondsPastMidnight={secondsPastMidnight} />
      <Clock amOrPm="pm" secondsPastMidnight={secondsPastMidnight} />
    </div>
  );
}

export default App;
