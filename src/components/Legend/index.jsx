import { DateTime } from "luxon"
import "./styles.css"
import * as Types from "../../types"

type Props = {|
  blocks: Types.Block[],
  setBlocks: (blocks: Types.Block[]) => void,
|}

function LegendRow(props) {
  return (
    <div className="legend-row">
      <span className="color-square" style={{ backgroundColor: props.block.color }} />
      <span className="inline-text">{props.block.name}</span>
      <span className="inline-text">{DateTime.now().set(props.block.start).toFormat("HH:mm")}</span>
      <span className="inline-text">-</span>
      <span className="inline-text">{DateTime.now().set(props.block.finish).toFormat("HH:mm")}</span>
    </div>
  )
}

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
