import css from "./SearchBox.module.css"

interface SearchBoxProps{
    getValue: (value: string) => void
}

export default function SearchBox({getValue}: SearchBoxProps){
 function handleChange(event: React.ChangeEvent<HTMLInputElement>){
    getValue(event.target.value)
 }

    return(
        <>
        <input
         onChange={handleChange}
	     className={css.input}
         type="text"
         placeholder="Search notes"
        />
    </>
    )
}