import React, { useEffect } from "react"
import "./styles.css"
import { DateTime } from "luxon"
import * as Types from "../../types"
import { timeToClockPercentage } from "../../helpers"
import Block from "../Block"

type Props = {
  amOrPm: "am" | "pm",
  blocks: Types.Block,
  currentTime: DateTime,
};

function Clock(props: Props) {
  useEffect(() => {
    const dayPercentComplete = timeToClockPercentage(
      props.currentTime,
      props.amOrPm
    )

    document.documentElement.style.setProperty(
      `--${props.amOrPm}-progress`,
      dayPercentComplete
    )
  }, [props.currentTime, props.amOrPm])

  return (
    <div className="clock-wrapper">
      <h1>{props.amOrPm}</h1>
      <div className="clock">
        <div className="outer-clock-face">
          <div className="marking zero"></div>
          <div className="marking one"></div>
          <div className="marking two"></div>
          <div className="marking three"></div>
          <div className="marking four"></div>
          <div className="marking five"></div>
          <div className="inner-clock-face">
            {props.blocks.map((block: Types.Block) => (
              <Block key={block.toString()} block={block} amOrPm={props.amOrPm} />
            ))}
            <div className={`clock-block-mask ${props.amOrPm}`} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Clock
