import React from "react"
import { DateTime } from "luxon"
import "./styles.css"
import * as Types from "../../types"

type Props = {
  block: Types.Block,
  deleteBlock: () => void,
}

type Status = "" | "current" | "past"

function MyBlock(props: Props) {
  const isCurrent =
    DateTime.now() >= DateTime.now().set(props.block.start) &&
    DateTime.now() <= DateTime.now().set(props.block.finish)
  const isPast =
    !isCurrent && DateTime.now() > DateTime.now().set(props.block.start)

  let status: ?Status = isCurrent ? "current" : ""
  if (status === "") {
    status = isPast ? "past" : ""
  }

  return (
    <div className={`my-block ${status}`}>
      <span
        className="color-square"
        style={{ backgroundColor: props.block.color }}
      />
      <span className="inline-text">{props.block.name}</span>
      <span className="inline-text">
        {DateTime.now().set(props.block.start).toFormat("HH:mm")}
      </span>
      <span className="inline-text">-</span>
      <span className="inline-text">
        {DateTime.now().set(props.block.finish).toFormat("HH:mm")}
      </span>
      <button onClick={props.deleteBlock}>X</button>
    </div>
  )
}

export default MyBlock
