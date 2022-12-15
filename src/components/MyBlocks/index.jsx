import React from "react"
import _ from "lodash"
import { DateTime } from "luxon"
import "./styles.css"
import * as Types from "../../types"
import MyBlock from "./MyBlock"

type Props = {
  blocks: Types.Block[],
  setBlocks: (blocks: Types.Block[]) => void,
}

function MyBlocks(props: Props) {
  return (
    <div className="my-blocks">
      <h2>My blocks</h2>
      {props.blocks.length > 0 ? null : (
        <div className="empty-state-text">
          {
            "You haven't added any blocks yet - use the form on the left to add a new block of time!"
          }
        </div>
      )}
      {props.blocks
        .sort(
          (a, b) =>
            DateTime.now().set(a.start).toSeconds() -
            DateTime.now().set(b.start).toSeconds()
        )
        .map((block) => (
          <MyBlock
            key={block.toString()}
            block={block}
            deleteBlock={() =>
              props.setBlocks(
                props.blocks.filter((arrBlock) => !_.isEqual(arrBlock, block))
              )
            }
          />
        ))}
    </div>
  )
}

export default MyBlocks