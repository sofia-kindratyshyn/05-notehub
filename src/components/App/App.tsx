import css from './App.module.css'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import NoteList from '../NoteList/NoteList'
import { fetchNotes } from '../../services/NoteService'
import type { NoteResponce } from '../../types/note'
import { useState } from 'react'
import Pagination from '../Pagination/Pagination'
import NoteModal from '../NoteModal/NoteModal'
import SearchBox from '../SearchBox/SearchBox'
import { Toaster } from 'react-hot-toast'
import React from 'react'
import Loader from '../Loader/Loader'


export default function App(){
const [pageCount, setPageCount] = useState(1)
const [openModal, setOpenModal] = useState(false)
const [searchedValue, setSearchedValue] = useState("")


const {data, isSuccess, isLoading} = useQuery<NoteResponce>({
 queryKey : ["note", pageCount, searchedValue],
 queryFn : () => fetchNotes(pageCount, searchedValue),
 placeholderData: keepPreviousData
})

function closeModal(){
    setOpenModal(false)
}

const getHandleSearch = (value: string) => {
    setSearchedValue(value)
}

return(
    <div className={css.app}>
        <Toaster/>
	<header className={css.toolbar}>
    <SearchBox getValue={getHandleSearch}/>
	{(data?.totalPages && data?.totalPages > 1) ? <Pagination totalPages={data.totalPages} SetPageCount={setPageCount}/> : <React.Fragment></React.Fragment>}
    {isSuccess && <button onClick={() => setOpenModal(!openModal)} className={css.button}>Create note +</button>}
  </header>
   {isLoading && <Loader/>}
   {data?.notes && data?.notes.length > 0 && <NoteList gotList={data.notes}/>}
   {openModal && <NoteModal toClose={closeModal}/>}
</div>

)
}