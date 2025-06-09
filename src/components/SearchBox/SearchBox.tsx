import css from "./SearchBox.module.css"

interface SearchBoxProps{
    getValue: (value: string) => void,
    value: string
}

export default function SearchBox({getValue, value}: SearchBoxProps){
 function handleChange(event: React.ChangeEvent<HTMLInputElement>){
    getValue(event.target.value)
 }

    return(
        <>
        <input
        value={value}
         onChange={handleChange}
	     className={css.input}
         type="text"
         placeholder="Search notes"
        />
    </>
    )
}