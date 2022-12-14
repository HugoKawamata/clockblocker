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

  const handleBlur = (setFn) => {
    return (event) => setFn(event.target.value)
  }

  const newBlock = () => {
    const startTime = DateTime.fromFormat(startTimeText, "HH:mm")
    const finishTime = DateTime.fromFormat(finishTimeText, "HH:mm")

    return {
      color,
      start: { hour: startTime.hour, minute: startTime.minute },
      finish: { hour: finishTime.hour, minute: finishTime.minute }
    }
  }

  const createNewBlock = () => {
    const newArray = props.blocks.concat([newBlock()])

    props.setBlocks(newArray)
  }

  return (
    <section>
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

      <button onClick={createNewBlock}>Create Block</button>
    </section>
  )
}

export default Form;
