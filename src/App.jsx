import React, { useState, useEffect } from "react"
import { DateTime } from "luxon"
import ReactMarkdown from "react-markdown"
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"

import readmePath from "./README.md"
import "./App.css"
import Clock from "./components/Clock"
import Form from "./components/Form"
import MyBlocks from "./components/MyBlocks"
import { blockInAm, blockInPm } from "./helpers"

function App() {
  const [infoModalOpen, setInfoModalOpen] = useState(false)
  const [infoModalText, setInfoModalText] = useState("")
  const [time, setTime] = useState(DateTime.now())
  const [blocks, setBlocks] = useState([])

  if (infoModalText === "") {
    fetch(readmePath)
      .then((resp) => resp.text())
      .then((text) => setInfoModalText(text))
  }

  console.log(infoModalText)

  useEffect(() => {
    const interval = setInterval(() => setTime(DateTime.now()), 10000)
    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <LocalizationProvider dateAdapter={AdapterLuxon}>
      <div id="main">
        <button onClick={() => setInfoModalOpen(true)}>ⓘ</button>
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
          <MyBlocks blocks={blocks} setBlocks={setBlocks} />
        </section>
      </div>
      {/* <Modal open={infoModalOpen}> */}
      <ReactMarkdown>{infoModalText}</ReactMarkdown>
      {/* </Modal> */}
    </LocalizationProvider>
  )
}

export default App
