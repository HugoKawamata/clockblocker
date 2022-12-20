import React from "react"
import _ from "lodash"
import { DateTime } from "luxon"
import Button from "@mui/material/Button"
import "./styles.css"
import * as Types from "../../types"
import MyBlock from "./MyBlock"

type Props = {
  blocks: Types.Block[],
  setBlocks: (blocks: Types.Block[]) => void,
}

function MyBlocks(props: Props) {
  const emptyState = (
    <div className="empty-state-text">
      {
        "You haven't added any blocks yet - use the form on the left to add a new block of time!"
      }
    </div>
  )

  const fullState = (
    <>
      {props.blocks
        .sort(
          (a, b) =>
            DateTime.now().set(a.start).toSeconds() -
            DateTime.now().set(b.start).toSeconds()
        )
        .map((block) => (
          <MyBlock
            key={JSON.stringify(block)}
            block={block}
            deleteBlock={() =>
              props.setBlocks(
                props.blocks.filter((arrBlock) => !_.isEqual(arrBlock, block))
              )
            }
          />
        ))}
      <div className="delete-button-wrapper">
        <Button
          variant="outlined"
          color="error"
          onClick={() => props.setBlocks([])}
        >
          Delete all blocks
        </Button>
      </div>
    </>
  )

  return (
    <div className="my-blocks">
      <h2>My blocks</h2>
      {props.blocks.length > 0 ? fullState : emptyState}
    </div>
  )
}

export default MyBlocks
