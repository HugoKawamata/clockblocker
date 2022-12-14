import { useState } from "react"
import './styles.css';
import { DateTime } from "luxon";
import * as Types from "../../types"

type Props = {|
  blocks: Types.Block[],
  setBlocks: (block: Types.Block[]) => void,
|}

function Form(props: Props) {
  const [startTimeText, setStartTimeText] = useState("")
  const [finishTimeText, setFinishTimeText] = useState("")
  const [color, setColor] = useState("")
  const [name, setName] = useState("")

  const handleBlur = (setFn) => {
    return (event) => setFn(event.target.value)
  }

  const newBlock = () => {
    const startTime = DateTime.fromFormat(startTimeText, "HH:mm")
    const finishTime = DateTime.fromFormat(finishTimeText, "HH:mm")

    return {
      color,
      name,
      start: { hour: startTime.hour, minute: startTime.minute },
      finish: { hour: finishTime.hour, minute: finishTime.minute }
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
        <label htmlFor="startTimeInput">Start Time (HH:MM)</label>
        <input id="startTimeInput" onBlur={handleBlur(setStartTimeText)} />
      </div>
      
      <div className="inputWrapper">
        <label htmlFor="finishTimeInput">Finish Time (HH:MM)</label>
        <input id="finishTimeInput" onBlur={handleBlur(setFinishTimeText)} />
      </div>

      <div className="inputWrapper">
        <label htmlFor="colorInput">Colour</label>
        <input id="colorInput" onBlur={handleBlur(setColor)} />
      </div>

      <div className="inputWrapper">
        <label htmlFor="nameInput">Name</label>
        <input id="nameInput" onBlur={handleBlur(setName)} />
      </div>

      <button onClick={createNewBlock}>Create Block</button>
    </div>
  )
}

export default Form;
