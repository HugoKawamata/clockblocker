import { DateTime } from "luxon"
import "./styles.css"
import "../../types"

type Props = {|
  block: Types.Block,
  deleteBlock: () => void
|}

type Status = "upcoming" | "current" | "past"

function LegendRow(props: Props) {
  const isCurrent = DateTime.now() >= DateTime.now().set(props.block.start) &&
    DateTime.now() <= DateTime.now().set(props.block.finish)
  const isUpcoming = !isCurrent && DateTime.now() < DateTime.now().set(props.block.start)

  const status: Status = isCurrent ? "current" : isUpcoming ? "upcoming" : "past"

  return (
    <div className={`legend-row ${status}`}>
      <span className="color-square" style={{ backgroundColor: props.block.color }} />
      <span className="inline-text">{props.block.name}</span>
      <span className="inline-text">{DateTime.now().set(props.block.start).toFormat("HH:mm")}</span>
      <span className="inline-text">-</span>
      <span className="inline-text">{DateTime.now().set(props.block.finish).toFormat("HH:mm")}</span>
      <button onClick={props.deleteBlock}>X</button>
    </div>
  )
}

export default LegendRow