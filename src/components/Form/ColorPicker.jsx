import React from "react"
import "./styles.css"
import { COLORS } from "../../constants"

type Props = {
  color: string,
  setColor: (color: string) => void,
}

function ColorPicker(props: Props) {
  return (
    <div className="color-picker">
      {Object.keys(COLORS).map((colorKey) => (
        <div key={colorKey} className="color-column">
          {Object.values(COLORS[colorKey]).map((color) => (
            <button
              key={color}
              className={`color-button ${
                color === props.color ? "selected" : ""
              }`}
              style={{ backgroundColor: color }}
              onClick={() => props.setColor(color)}
            />
          ))}
        </div>
      ))}
    </div>
  )
}

export default ColorPicker
