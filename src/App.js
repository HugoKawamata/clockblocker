import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div id="main">
      <div className="clock">
        <div class="outer-clock-face">
          <div class="marking zero"></div>
          <div class="marking one"></div>
          <div class="marking two"></div>
          <div class="marking three"></div>
          <div class="marking four"></div>
          <div class="marking five"></div>
          <div class="inner-clock-face">
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
