import { useEffect, useState } from "react"
import css from "./SearchBox.module.css"
import { useDebounce } from "use-debounce"

interface SearchBoxProps{
    getValue: (value: string) => void
}

export default function SearchBox({getValue}: SearchBoxProps){
 const [searchedValue, setSearchedValue] = useState("")
 const [debouncedText] = useDebounce(searchedValue, 200)

 useEffect(() => {
  getValue(debouncedText)
 }, [debouncedText, getValue])

 function handleChange(event: React.ChangeEvent<HTMLInputElement>){
    setSearchedValue(event.target.value)
 }

    return(
        <>
        <input
         value={searchedValue}
         onChange={handleChange}
	     className={css.input}
         type="text"
         placeholder="Search notes"
        />
    </>
    )
}