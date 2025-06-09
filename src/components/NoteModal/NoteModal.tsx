 import { useEffect } from "react"
import NoteForm from "../NoteForm/NoteForm"
import css from "./NoteModal.module.css"
import { createPortal } from "react-dom"

interface NoteModalProps{
 toClose: () => void
}

export default function NoteModal({toClose}: NoteModalProps){

  function handleBackdropClick(event: React.MouseEvent<HTMLDivElement>){
    if(event.target === event.currentTarget){
      toClose()
    }
  }

  useEffect(() => {
  function handleKeyDown(event: KeyboardEvent){
    if(event.key === "Escape"){
      toClose()
    }
  }

  document.addEventListener("keydown", handleKeyDown)
  document.body.style.overflow = "hidden"

  return(() => {
    document.removeEventListener('keydown', handleKeyDown)
    document.body.style.overflow = ""
  })
  },[toClose])

    return createPortal(
<div
  className={css.backdrop}
  role="dialog"
  aria-modal="true"
  onClick={handleBackdropClick}
>
  <div className={css.modal}>
    <NoteForm onClose={toClose}/> 
  </div>
</div>,
document.body

    )
}