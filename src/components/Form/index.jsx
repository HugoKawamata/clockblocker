import React, { useState, useEffect } from "react"
import "./styles.css"
import { TimePicker } from "@mui/x-date-pickers/TimePicker"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import { DateTime } from "luxon"
import ColorPicker from "./ColorPicker"
import * as Types from "../../types"
import { COLORS } from "../../constants"

type Props = {
  blocks: Types.Block[],
  setBlocks: (block: Types.Block[]) => void,
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
  })

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

    props.setBlocks(newArray)
  }

  const canSubmit = timesAreValid && startTime < finishTime

  const validationWarnings = () => {
    const warnings = []
    if (timesAreValid && startTime > finishTime) {
      warnings.push([
        <div key="finish-before-start" className="validation-warning">
          Finish time must be after start time
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
      <div className="input-wrapper">
        <TimePicker
          label="Start time"
          value={startTime}
          onChange={(newValue: DateTime) => {
            setStartTime(newValue)
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </div>

      <div className="input-wrapper">
        <TimePicker
          label="Finish time"
          value={finishTime}
          onChange={(newValue: DateTime) => {
            setFinishTime(newValue)
          }}
          renderInput={(params) => <TextField {...params} />}
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

      <ColorPicker color={color} setColor={setColor} />

      <div className="button-wrapper">
        <Button
          variant="contained"
          onClick={createNewBlock}
          disabled={!canSubmit}
        >
          Create Block
        </Button>
        {validationWarnings()}
      </div>
    </div>
  )
}

export default Form
