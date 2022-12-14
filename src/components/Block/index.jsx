import './styles.css';
// import { DateTime } from "luxon";
import * as Types from "../../types"

type Props = {|
  block: Types.Block,
|}

const getInnerStyle = (block: Types.Block) => ({
  background: "conic-gradient(#0000 0%, #FF0 calc(80*1%), #FF0 calc(90*1%), #0000 0%)"
})

function Block(props: Props) {
  const innerStyle = getInnerStyle(props.block)
  return (
    <div className="clock-block">
      <div className="clock-block-inner" style={innerStyle}/>
    </div>
  );
}

export default Block;
