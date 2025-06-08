import css from "./NoteForm.module.css"
import {Formik, Field, Form, type FormikHelpers} from "formik"
import type { NoteForPost } from "../../types/note"
import { useMutation, useQueryClient} from "@tanstack/react-query"
import { postNotes } from "../../services/NoteService"
import toast from "react-hot-toast"


interface NoteFormProps{
  toClose: () => void
}


export default function NoteForm({toClose}: NoteFormProps){
 const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: (noteForPost: NoteForPost) => postNotes(noteForPost) ,
    onError: ()=>{
     toast.error("There was an error while deleting.")

    },
    onSuccess: () => {
      toast.success("The note successfully created.")
     queryClient.invalidateQueries({queryKey: ['note']});
      toClose();
     }
})


function handleSubmit(values: NoteForPost, actions:FormikHelpers<NoteForPost>){
mutation.mutate(values)
actions.resetForm()
}

return(
<Formik initialValues={ { title: "",
  content: "",
  tag: "Todo"}} onSubmit={handleSubmit}>
<Form className={css.form}>
  <div className={css.formGroup}>
    <label htmlFor="title">Title</label>
    <Field id="title" type="text" name="title" className={css.input} />
    <span data-name="title" className={css.error} /> 
  </div>

  <div className={css.formGroup}>
    <label htmlFor="content">Content</label>
    <Field as="textarea"
      id="content"
      name="content"
      rows={8}
      className={css.textarea}
    />
   <span data-name="content" className={css.error} /> 
  </div>

  <div className={css.formGroup}>
    <label htmlFor="tag">Tag</label>
    <Field as="select" id="tag" name="tag" className={css.select}>
      <option value="Todo">Todo</option>
      <option value="Work">Work</option>
      <option value="Personal">Personal</option>
      <option value="Meeting">Meeting</option>
      <option value="Shopping">Shopping</option>
    </Field>
    <span data-name="tag" className={css.error} /> 
  </div>

  <div className={css.actions}>
    <button onClick={() => toClose()} type="button" className={css.cancelButton}>
      Cancel
    </button>
    <button
      type="submit"
      className={css.submitButton}
      disabled={false}
    >
      Create note
    </button>
  </div>
  </Form>
</Formik>

    )
}