import React, { useState, useEffect } from "react"
import { DateTime } from "luxon"
import ReactMarkdown from "react-markdown"
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"

import readmePath from "./README.md"
import "./App.css"
import Clock from "./components/Clock"
import Form from "./components/Form"
import Modal from "./components/Modal"
import MyBlocks from "./components/MyBlocks"
import * as Types from "./types"
import { blockInAm, blockInPm } from "./helpers"

function App() {
  const [infoModalOpen, setInfoModalOpen] = useState(false)
  const [infoModalText, setInfoModalText] = useState("")
  const [time, setTime] = useState(DateTime.now())
  const [showTitle, setShowTitle] = useState(true)
  const [blocks, setBlocksRaw] = useState([])
  const [ghostBlock, setGhostBlock] = useState(null)
  const setBlocks = (blocks: Types.Blocks) => {
    document.cookie = JSON.stringify(blocks)
    return setBlocksRaw(blocks)
  }

  if (document.cookie !== "" && document.cookie !== JSON.stringify(blocks)) {
    setBlocksRaw(JSON.parse(document.cookie))
  }

  if (infoModalText === "") {
    fetch(readmePath)
      .then((resp) => resp.text())
      .then((text) => setInfoModalText(text))
  }

  useEffect(() => {
    const interval = setInterval(() => setTime(DateTime.now()), 10000)
    return () => {
      clearInterval(interval)
    }
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => setShowTitle(false), 3000)
    return () => {
      clearTimeout(timer)
    }
  }, [showTitle])

  return (
    <LocalizationProvider dateAdapter={AdapterLuxon}>
      <div id="main">
        <h1 id="title" className={showTitle ? "" : "fade-out"}>
          🕗 Clockblocker 🕓
        </h1>
        <button className="info-button" onClick={() => setInfoModalOpen(true)}>
          ⓘ
        </button>
        <section className="clocks">
          <Clock
            amOrPm="am"
            blocks={blocks.filter((block) => blockInAm(block))}
            ghostBlock={
              ghostBlock != null && blockInAm(ghostBlock) ? ghostBlock : null
            }
            currentTime={time}
          />
          <Clock
            amOrPm="pm"
            blocks={blocks.filter((block) => blockInPm(block))}
            ghostBlock={
              ghostBlock != null && blockInPm(ghostBlock) ? ghostBlock : null
            }
            currentTime={time}
          />
        </section>
        <section className="blocks">
          <Form
            blocks={blocks}
            setBlocks={setBlocks}
            setGhostBlock={setGhostBlock}
          />
          <MyBlocks blocks={blocks} setBlocks={setBlocks} />
        </section>
      </div>
      <Modal open={infoModalOpen} setModalOpen={setInfoModalOpen}>
        <ReactMarkdown>{infoModalText}</ReactMarkdown>
      </Modal>
    </LocalizationProvider>
  )
}

export default App
