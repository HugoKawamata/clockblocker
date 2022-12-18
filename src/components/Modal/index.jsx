import React from "react"
import "./styles.css"

type Props = {
  children: React.Node,
  open: boolean,
  setModalOpen: () => void,
}

function Modal(props: Props) {
  if (!props.open) {
    return null
  }

  return (
    <>
      <div className="modal">
        <div className="modal-content">{props.children}</div>
        <button
          className="close-button"
          onClick={() => props.setModalOpen(false)}
        >
          ✖
        </button>
      </div>
      <div className="frosted-glass" />
    </>
  )
}

export default Modal
