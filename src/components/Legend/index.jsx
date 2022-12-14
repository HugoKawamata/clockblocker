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
      <span>{props.block.name}</span>
    </div>
  )
}

function Legend(props: Props) {
  return (
    <div className="legend">
      <h2>Legend</h2>
      {
        props.blocks.map((block) => (<LegendRow block={block} />))
      }
    </div>
  );
}

export default Legend;
