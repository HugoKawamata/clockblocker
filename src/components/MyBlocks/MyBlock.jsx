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
      <div className="my-block-inner">
        <span
          className="color-square"
          style={{ backgroundColor: props.block.color }}
        />
        <span className="inline-text">{props.block.name}</span>
      </div>
      <div className="my-block-inner">
        <span className="inline-text">
          {`${DateTime.now()
            .set(props.block.start)
            .toFormat("h:mm a")} - ${DateTime.now()
            .set(props.block.finish)
            .toFormat("h:mm a")}`}
        </span>
        <button className="delete-block-button" onClick={props.deleteBlock}>
          ✖
        </button>
      </div>
    </div>
  )
}

export default MyBlock
