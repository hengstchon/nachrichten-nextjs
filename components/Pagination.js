import ReactPaginate from 'react-paginate'

const Pagination = ({ totalPage, handlePageClick }) => {
  const pageLinkClassName =
    'flex justify-center items-center w-8 h-8 rounded-full text-lg font-medium mx-3 cursor-pointer bg-gray-100 hover:bg-gray-300'

  return (
    <div className="flex">
      <div className="hidden w-64 h-10 lg:block"></div>
      <div className="flex-1 justify-center mt-5 mb-20">
        <ReactPaginate
          pageCount={totalPage}
          pageRangeDisplayed={3}
          marginPagesDisplayed={3}
          onPageChange={handlePageClick}
          previousLabel={'<'}
          nextLabel={'>'}
          containerClassName={'flex w-max mx-auto'}
          pageLinkClassName={`${pageLinkClassName}`}
          previousLinkClassName={pageLinkClassName}
          nextLinkClassName={pageLinkClassName}
          activeLinkClassName={
            'text-white bg-blue-400 hover:text-blue-400 hover:bg-blue-200'
          }
          disabledClassName={'opacity-10'}
        />
      </div>
    </div>
  )
}

export default Pagination
