import React, { useState } from "react"
import "./styles.css"
import { TimePicker } from "@mui/x-date-pickers/TimePicker"
import TextField from "@mui/material/TextField"
import * as Types from "../../types"

type Props = {
  blocks: Types.Block[],
  setBlocks: (block: Types.Block[]) => void,
}

function Form(props: Props) {
  const [startTime, setStartTime] = useState(null)
  const [finishTime, setFinishTime] = useState(null)
  const [color, setColor] = useState("")
  const [name, setName] = useState("")

  const handleBlur = (setFn) => {
    return (event) => setFn(event.target.value)
  }

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

  return (
    <div className="form">
      <h2>Add new block</h2>
      <div className="inputWrapper">
        <TimePicker
          label="Start time"
          value={startTime}
          onChange={(newValue) => {
            setStartTime(newValue)
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </div>

      <div className="inputWrapper">
        <TimePicker
          label="Finish time"
          value={finishTime}
          onChange={(newValue) => {
            setFinishTime(newValue)
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </div>

      <div className="inputWrapper">
        <TextField
          label="Name"
          value={name}
          onChange={(event) => {
            setName(event.target.value)
          }}
        />
      </div>

      <div className="inputWrapper">
        <label htmlFor="colorInput">Colour</label>
        <input id="colorInput" onBlur={handleBlur(setColor)} />
      </div>

      <button onClick={createNewBlock}>Create Block</button>
    </div>
  )
}

export default Form
