import './styles.css';
import { DateTime } from "luxon";
import { timeToClockPercentage } from "../../helpers"
import * as Types from "../../types"

type Props = {|
  amOrPm: "am" | "pm",
  block: Types.Block,
|}

function Block(props: Props) {
  const getInnerStyle = () => {
    const startTime = DateTime.now().set(props.block.start)
    const finishTime = DateTime.now().set(props.block.finish)
    const startPercentage = timeToClockPercentage(startTime, props.amOrPm)
    const finishPercentage = timeToClockPercentage(finishTime, props.amOrPm)
    console.log(startPercentage, finishPercentage)
    
    return ({
      background: `conic-gradient(#0000 calc(${startPercentage}*1%), #FF0 calc(${startPercentage}*1%), #FF0 calc(${finishPercentage}*1%), #0000 0%)`
    })
  }

  const innerStyle = getInnerStyle(props.block)
  return (
    <div className="clock-block-inner" style={innerStyle}/>
  );
}

export default Block;
