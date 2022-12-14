import { DateTime } from "luxon"
import "./styles.css"
import * as Types from "../../types"
import LegendRow from "./LegendRow"

type Props = {|
  blocks: Types.Block[],
  setBlocks: (blocks: Types.Block[]) => void,
|}

function Legend(props: Props) {
  return (
    <div className="legend">
      <h2>Legend</h2>
      {
        props.blocks
          .sort((a, b) => DateTime.now().set(a.start).toSeconds() - DateTime.now().set(b.start).toSeconds())
          .map((block) => (<LegendRow block={block} />))
      }
    </div>
  );
}

export default Legend;
