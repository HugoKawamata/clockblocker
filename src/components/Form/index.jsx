import React, { useState, useEffect } from "react"
import { TimePicker } from "@mui/x-date-pickers/TimePicker"
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
  setBlocks: (blocks: Types.Block[]) => void,
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

  const newBlock = () => {
    return {
      color,
      name,
      start: { hour: startTime.hour, minute: startTime.minute },
      finish: { hour: finishTime.hour, minute: finishTime.minute },
    }
  }

  const createNewBlock = () => {
    const newArray = props.blocks.concat([newBlock()])

    props.setGhostBlock(null)
    props.setBlocks(newArray)
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
      <h2>Add new block</h2>
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
              onClick={createNewBlock}
              disabled={!canSubmit}
              fullWidth
            >
              Create Block
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Form
