import React, { useState, useEffect } from "react"
import { DateTime } from "luxon"
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import "./App.css"
import Clock from "./components/Clock"
import Form from "./components/Form"
import Legend from "./components/Legend"
import { blockInAm, blockInPm } from "./helpers"

function App() {
  const [time, setTime] = useState(DateTime.now())
  const [blocks, setBlocks] = useState([])

  useEffect(() => {
    const interval = setInterval(() => setTime(DateTime.now()), 10000)
    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <LocalizationProvider dateAdapter={AdapterLuxon}>
      <div id="main">
        <section className="clocks">
          <Clock
            amOrPm="am"
            blocks={blocks.filter((block) => blockInAm(block))}
            currentTime={time}
          />
          <Clock
            amOrPm="pm"
            blocks={blocks.filter((block) => blockInPm(block))}
            currentTime={time}
          />
        </section>
        <section className="blocks">
          <Form blocks={blocks} setBlocks={setBlocks} />
          <Legend blocks={blocks} setBlocks={setBlocks} />
        </section>
      </div>
    </LocalizationProvider>
  )
}

export default App
