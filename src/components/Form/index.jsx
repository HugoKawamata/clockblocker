import React, { useState, useEffect } from "react"
import { TimePicker } from "@mui/x-date-pickers/TimePicker"
import SyncIcon from "@mui/icons-material/SyncAlt"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import { DateTime } from "luxon"
import _ from "lodash"
import "./styles.css"
import ColorPicker from "./ColorPicker"
import * as Types from "../../types"
import { COLORS } from "../../constants"

type Props = {
  blocks: Types.Block[],
  editingBlockId: ?string,
  setBlocks: (blocks: Types.Block[]) => void,
  setEditingBlockId: (blockId: ?string) => void,
  setGhostBlock: (block: Types.Block) => void,
}

function Form(props: Props) {
  const [startTime, setStartTime] = useState(null)
  const [finishTime, setFinishTime] = useState(null)
  const [color, setColor] = useState(COLORS.yellows.mid)
  const [name, setName] = useState("")

  const timesAreValid =
    startTime != null &&
    finishTime != null &&
    !startTime.invalid &&
    !finishTime.invalid

  const finishIsMidnight = () =>
    finishTime.hour === 0 && finishTime.minute === 0

  const finishIsMidnightAndNeedsAdjusting =
    timesAreValid &&
    finishIsMidnight() &&
    startTime > finishTime &&
    startTime.toISODate() === finishTime.toISODate()

  const finishIsNotMidnightAndNeedsAdjusting =
    timesAreValid &&
    !finishIsMidnight() &&
    finishTime.toISODate() !== startTime.toISODate()

  useEffect(() => {
    const editingBlock = props.blocks.find(
      (block) => block.id === props.editingBlockId
    )
    if (editingBlock) {
      setStartTime(DateTime.fromObject(editingBlock.start))
      setFinishTime(DateTime.fromObject(editingBlock.finish))
      setName(editingBlock.name)
      setColor(editingBlock.color)

      // After setting form inputs, change the existing block to be transparent so our ghost
      // block can pretend to be it.
      props.setBlocks(
        props.blocks.map((block) => {
          if (block.id !== editingBlock.id) {
            return block
          } else {
            return { ...editingBlock, color: "transparent" }
          }
        })
      )
    }
  }, [props.editingBlockId])

  useEffect(() => {
    if (finishIsMidnightAndNeedsAdjusting) {
      setFinishTime(finishTime.plus({ days: 1 }))
    } else if (finishIsNotMidnightAndNeedsAdjusting) {
      setFinishTime(
        finishTime.set({
          year: startTime.year,
          month: startTime.month,
          day: startTime.day,
        })
      )
    }
  }, [finishTime, startTime])

  const maybeSetGhostBlock = () => {
    if (timesAreValid) {
      props.setGhostBlock({
        color,
        name,
        start: { hour: startTime.hour, minute: startTime.minute },
        finish: { hour: finishTime.hour, minute: finishTime.minute },
      })
    }
  }

  useEffect(() => {
    maybeSetGhostBlock()
  }, [finishTime, startTime, color, name])

  const newBlock = (id: ?string) => {
    return {
      color,
      name,
      id: id || self.crypto.randomUUID(),
      start: { hour: startTime.hour, minute: startTime.minute },
      finish: { hour: finishTime.hour, minute: finishTime.minute },
    }
  }

  const createNewBlock = () => {
    const newArray = props.blocks.concat([newBlock()])

    setStartTime(finishTime)
    setFinishTime(null)
    props.setGhostBlock(null)
    props.setBlocks(newArray)
  }

  const updateBlock = () => {
    const newArray = props.blocks.slice()
    props.setBlocks(
      newArray.map((block) => {
        if (block.id !== props.editingBlockId) {
          return block
        } else {
          return newBlock(props.editingBlockId)
        }
      })
    )
    props.setEditingBlockId(null)
  }

  const canSubmit = timesAreValid && startTime < finishTime

  const validationWarnings = () => {
    const warnings = []
    if (timesAreValid && startTime > finishTime) {
      warnings.push([
        <div key="finish-before-start" className="validation-warning">
          Finish must be after start
        </div>,
      ])
    }
    return (
      warnings.length > 0 && (
        <div className="validation-warnings">{warnings}</div>
      )
    )
  }

  return (
    <div className="form">
      <h2>{props.editingBlockId ? "Edit block" : "Add new block"}</h2>
      <div className="form-content">
        <div className="form-left">
          <div className="input-wrapper">
            <TimePicker
              label="Start time"
              value={startTime}
              disableMaskedInput
              inputFormat="h:mma"
              onChange={(newValue: DateTime) => {
                setStartTime(newValue)
              }}
              placeholder="gunga"
              renderInput={(params) => (
                <TextField
                  {...params}
                  inputProps={{
                    ...params.inputProps,
                    value: _.toLower(params.inputProps.value),
                    placeholder: "e.g. 9:00am",
                  }}
                />
              )}
            />
          </div>

          <div className="input-wrapper">
            <Button
              variant="outlined"
              startIcon={<SyncIcon />}
              onClick={() => {
                const prevFinish = finishTime
                setFinishTime(startTime)
                setStartTime(prevFinish)
              }}
            >
              Swap times
            </Button>
          </div>
          <div className="input-wrapper">
            <TimePicker
              label="Finish time"
              value={finishTime}
              disableMaskedInput
              inputFormat="h:mma"
              onChange={(newValue: DateTime) => {
                setFinishTime(newValue)
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  inputProps={{
                    ...params.inputProps,
                    value: _.toLower(params.inputProps.value),
                    placeholder: "e.g. 12:30pm",
                  }}
                />
              )}
            />
          </div>

          <div className="input-wrapper">
            <TextField
              label="Name"
              value={name}
              onChange={(event) => {
                setName(event.target.value)
              }}
            />
          </div>
        </div>

        <div className="form-right">
          <ColorPicker color={color} setColor={setColor} />
          {validationWarnings()}
          <div className="create-button-wrapper">
            <Button
              variant="contained"
              onClick={props.editingBlockId ? updateBlock : createNewBlock}
              disabled={!canSubmit}
              fullWidth
            >
              {props.editingBlockId ? "Update Block" : "Create Block"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Form
