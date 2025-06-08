import { useMutation, useQueryClient } from "@tanstack/react-query"
import type {Note, NoteList } from "../../types/note"
import css from "./NoteList.module.css"
import toast from "react-hot-toast"
import { deleteNotes } from "../../services/noteService"

interface NoteListProps{
 gotList: Note[]
}

export default function NoteList({gotList} : NoteListProps){

  const queryClient = useQueryClient()

 const mutation = useMutation({
  mutationFn: (noteId: number) => deleteNotes(noteId),
  onError: ()=>{
    toast.error("There was an error while creating.")

   },
  onSuccess: () =>{
    toast.success("The note successfully deleted!")
    queryClient.invalidateQueries({queryKey: ["note"]})
  }
 })

    return(
        <ul className={css.list}>
	{gotList.map((note) => {
    return(
<li key={note.id} className={css.listItem}>
    <h2 className={css.title}>{note.title}</h2>
    <p className={css.content}>{note.content}</p>
    <div className={css.footer}>
      <span className={css.tag}>{note.tag}</span>
      <button onClick={() => mutation.mutate(note.id)} className={css.button}>Delete</button>
    </div>
  </li>
    )
    })}
</ul>

    )
}