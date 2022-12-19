import React from "react"
import "./styles.css"
import { DateTime } from "luxon"
import { timeToClockPercentage } from "../../helpers"
import * as Types from "../../types"

type Props = {
  amOrPm: "am" | "pm",
  block: Types.Block,
  ghost: boolean,
}

function Block(props: Props) {
  const getInnerStyle = () => {
    const startTime = DateTime.now().set(props.block.start)
    const finishTime =
      props.block.finish.hour === 0
        ? DateTime.now().plus({ days: 1 }).set(props.block.finish)
        : DateTime.now().set(props.block.finish)
    const startPercentage = timeToClockPercentage(startTime, props.amOrPm)
    const finishPercentage = timeToClockPercentage(finishTime, props.amOrPm)
    const ghostOpacityHex = props.ghost ? "AA" : "FF"

    return {
      background: `conic-gradient(#0000 calc(${startPercentage}*1%), ${props.block.color}${ghostOpacityHex} calc(${startPercentage}*1%), ${props.block.color}${ghostOpacityHex} calc(${finishPercentage}*1%), #0000 0%)`,
    }
  }

  const innerStyle = getInnerStyle(props.block)
  return <div className="clock-block-inner" style={innerStyle} />
}

export default Block
