import ReactPaginate from 'react-paginate'
import css from './Pagination.module.css'

interface PaginationProps{
    totalPages: number,
    onPageChange: (selected: number) => void,
    currentPage: number
}

export default function Paginate({totalPages, onPageChange, currentPage}: PaginationProps){
    return(
        <ReactPaginate 
        pageCount={totalPages}
        forcePage={currentPage - 1}
        pageRangeDisplayed={5}
        marginPagesDisplayed={1}
        onPageChange={({selected}) => {onPageChange(selected + 1); console.log(selected)}}
        containerClassName={css.pagination}
        activeClassName={css.active}
        nextLabel="→"
        previousLabel="←"
         />
    )
}