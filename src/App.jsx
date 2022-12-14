import { useState, useEffect } from "react"
import { DateTime } from "luxon"
import "./App.css"
import Clock from "./components/Clock"
import Form from "./components/Form"
import { blockInAm, blockInPm } from "./helpers"
// import type { Block } from "./types"

const dummyBlock = {
  start: { hour: 21, minute: 0 },
  finish: { hour: 22, minute: 30}
}

function App() {
  const [time, setTime] = useState(DateTime.now());
  const [blocks, setBlocks] = useState([])

  useEffect(() => {
    const interval = setInterval(() => setTime(DateTime.now()), 10000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div id="main">
      <section className="clocks">
        <Clock
          amOrPm="am"
          blocks={blocks.filter((block) => blockInAm(block))}
          currentTime={time}
        />
        <Clock
          amOrPm="pm"
          blocks={blocks.filter((block) => blockInPm(block))}
          currentTime={time}
        />
      </section>
      <Form blocks={blocks} setBlocks={setBlocks} />
    </div>
  );
}

export default App;
