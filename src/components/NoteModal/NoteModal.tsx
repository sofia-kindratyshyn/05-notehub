 import NoteForm from "../NoteForm/NoteForm"
import css from "./NoteModal.module.css"
import { createPortal } from "react-dom"

interface NoteModalProps{
 toClose: () => void
}

export default function NoteModal({toClose}: NoteModalProps){
  
    return createPortal(
<div
  className={css.backdrop}
  role="dialog"
  aria-modal="true"
>
  <div className={css.modal}>
    <NoteForm toClose={toClose}/> 
  </div>
</div>,
document.body

    )
}