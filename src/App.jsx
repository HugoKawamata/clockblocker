import "./App.css"
import { DateTime } from "luxon"
import Clock from "./components/Clock"

const SECONDS_IN_DAY = 86400

const secondsPastMidnight = DateTime.now().toSeconds() - DateTime.now().startOf("day").toSeconds()
const dayPercentComplete = (secondsPastMidnight / SECONDS_IN_DAY) * 100

function App() {
  return (
    <div id="main">
      <Clock amOrPm="am" secondsPastMidnight={secondsPastMidnight} />
      <Clock amOrPm="pm" secondsPastMidnight={secondsPastMidnight} />
    </div>
  );
}

export default App;
