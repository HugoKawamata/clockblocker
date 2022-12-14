import { useState, useEffect } from "react"
import { DateTime } from "luxon"
import "./App.css"
import Clock from "./components/Clock"
import { blockInAm, blockInPm } from "./helpers"
// import type { Block } from "./types"


function App() {
  const [time, setTime] = useState(DateTime.now());
  const [blocks, setBlocks] = useState([])

  useEffect(() => {
    const interval = setInterval(() => setTime(DateTime.now()), 10000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const secondsPastMidnight = time.toSeconds() - time.startOf("day").toSeconds()

  return (
    <div id="main">
      <Clock
        amOrPm="am"
        blocks={blocks.filter((block) => blockInAm(block))}
        secondsPastMidnight={secondsPastMidnight}
      />
      <Clock
        amOrPm="pm"
        blocks={blocks.filter((block) => blockInPm(block))}
        secondsPastMidnight={secondsPastMidnight}
      />
    </div>
  );
}

export default App;
