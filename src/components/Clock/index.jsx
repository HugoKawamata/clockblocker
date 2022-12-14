import { useEffect } from "react"
import './styles.css';
// import { DateTime } from "luxon";
import * as Types from "../../types"
import Block from "../Block"

const SECONDS_IN_DAY = 86400
const SECONDS_IN_12_HOURS = SECONDS_IN_DAY / 2


type Props = {|
  amOrPm: "am" | "pm",
  block: Types.Block,
  secondsPastMidnight: number,
|}

function Clock(props: Props) {
  useEffect(() => {
    const secondsElapsed = Math.max(
      props.secondsPastMidnight - (props.amOrPm === "pm" ? SECONDS_IN_12_HOURS : 0),
      0
    )
    const dayPercentComplete = (secondsElapsed / SECONDS_IN_12_HOURS) * 100

    console.log(props.amOrPm, secondsElapsed, dayPercentComplete)

    document.documentElement.style.setProperty(`--${props.amOrPm}-progress`, dayPercentComplete)
  }, [props.secondsPastMidnight, props.amOrPm])

  return (
    <div className="clock">
      <div className="outer-clock-face">
        <div className="marking zero"></div>
        <div className="marking one"></div>
        <div className="marking two"></div>
        <div className="marking three"></div>
        <div className="marking four"></div>
        <div className="marking five"></div>
        <div className="inner-clock-face">
          {/* TODO: Make it take an array of "clock blocks" of different colours */}
          <div className={`clock-block-mask ${props.amOrPm}`}>
            {
              props.blocks.map((block: Types.Block) => (<Block block={block} />))
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default Clock;
