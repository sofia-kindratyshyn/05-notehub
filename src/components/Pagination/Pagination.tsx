import ReactPaginate from 'react-paginate'
import css from './Pagination.module.css'
import type { Dispatch, SetStateAction } from 'react'

interface PaginationProps{
    totalPages: number,
    SetPageCount: Dispatch<SetStateAction<number>>
}

export default function Paginate({totalPages, SetPageCount}: PaginationProps){
    return(
        <ReactPaginate 
        pageCount={totalPages}
        pageRangeDisplayed={5}
        marginPagesDisplayed={1}
        onPageChange={({selected}) => SetPageCount(selected + 1)}
        containerClassName={css.pagination}
        activeClassName={css.active}
        nextLabel="→"
        previousLabel="←"
         />
    )
}