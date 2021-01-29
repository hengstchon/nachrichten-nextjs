import ReactPaginate from 'react-paginate'

const Pagination = ({ totalPage, handlePageClick }) => {
  const pageClassName =
    'w-8 h-8 mx-3 flex justify-center items-center rounded-full bg-gray-100 hover:bg-gray-300'
  const pageLinkClassName = 'text-lg font-medium'

  return (
    <ReactPaginate
      pageCount={totalPage}
      pageRangeDisplayed={3}
      marginPagesDisplayed={3}
      onPageChange={handlePageClick}
      previousLabel={'<'}
      nextLabel={'>'}
      containerClassName={'flex'}
      pageClassName={`${pageClassName}`}
      pageLinkClassName={pageLinkClassName}
      previousClassName={pageClassName}
      previousLinkClassName={pageLinkClassName}
      nextClassName={pageClassName}
      nextLinkClassName={pageLinkClassName}
      activeClassName={'text-indigo-100 bg-indigo-600'}
      activeLinkClassName={''}
      disabledClassName={'opacity-40 bg-transparent'}
    />
  )
}

export default Pagination
