import "./App.css"
import { DateTime } from "luxon"
import Clock from "./components/Clock"

// TODO: Set this up on an interval to update every 10 sec or so
const secondsPastMidnight = DateTime.now().toSeconds() - DateTime.now().startOf("day").toSeconds()

function App() {
  return (
    <div id="main">
      <Clock amOrPm="am" secondsPastMidnight={secondsPastMidnight} />
      <Clock amOrPm="pm" secondsPastMidnight={secondsPastMidnight} />
    </div>
  );
}

export default App;
