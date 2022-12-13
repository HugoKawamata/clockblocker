import logo from './logo.svg';
import './App.css';
import { DateTime } from "luxon";

const SECONDS_IN_DAY = 86400

const secondsPastMidnight = DateTime.now().toSeconds() - DateTime.now().startOf("day").toSeconds()
const dayPercentComplete = (secondsPastMidnight / SECONDS_IN_DAY) * 100

function App() {
  document.documentElement.style.setProperty('--progress', dayPercentComplete);

  return (
    <div id="main">
      <div className="clock">
        <div className="outer-clock-face">
          <div className="marking zero"></div>
          <div className="marking one"></div>
          <div className="marking two"></div>
          <div className="marking three"></div>
          <div className="marking four"></div>
          <div className="marking five"></div>
          <div className="inner-clock-face">
            <div
              className="clock-block"
              // style="--p:60;--b:10px;--c:purple;" 
            >
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
