import css from './App.module.css'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import NoteList from '../NoteList/NoteList'
import { fetchNotes } from '../../services/noteService'
import type { NoteResponse } from '../../services/noteService'
import { useState } from 'react'
import Pagination from '../Pagination/Pagination'
import NoteModal from '../NoteModal/NoteModal'
import SearchBox from '../SearchBox/SearchBox'
import { Toaster } from 'react-hot-toast'

import Loader from '../Loader/Loader'
import { useDebounce } from 'use-debounce'
import React from 'react'


export default function App(){
const [pageCount, setPageCount] = useState(1)
const [openModal, setOpenModal] = useState(false)
const [searchedValue, setSearchedValue] = useState("")
const [debouncedText] = useDebounce(searchedValue, 300)


const {data, isSuccess, isLoading} = useQuery<NoteResponse>({
 queryKey : ["note", debouncedText, pageCount],
 queryFn : () => fetchNotes(pageCount, debouncedText),
 placeholderData: keepPreviousData
})

function closeModal(){
    setOpenModal(false)
}

const getHandleSearch = (value: string) => {
    setSearchedValue(value)
    setPageCount(1)
}


return(
    <div className={css.app}>
        <Toaster/>
	<header className={css.toolbar}>
    <SearchBox value={searchedValue} getValue={getHandleSearch}/>
	{(data?.totalPages && data?.totalPages > 1) ? <Pagination totalPages={data.totalPages} currentPage={pageCount} onPageChange={setPageCount}/> : <React.Fragment></React.Fragment> }
    {isSuccess && <button onClick={() => setOpenModal(!openModal)} className={css.button}>Create note +</button>}
  </header>
   {isLoading && <Loader/>}
   {(data?.notes && data.notes.length == 0) && <p>There are no notes found for your request</p>}
   {data?.notes && data?.notes.length > 0 && <NoteList notes={data.notes}/>}
   {openModal && <NoteModal toClose={closeModal}/>}
</div>

)
}