import Item from './Item'
import Pagination from './Pagination'
import Loading from './Loading'

const Page = ({ pageItems, totalPage, page }) => {
  return (
    <div className="flex">
      <div className="lg:w-64 invisible"></div>
      <div className="container lg:max-w-screen-md mx-auto px-2 mt-5 divide-y divide-gray-600">
        {pageItems ? (
          <div>
            {pageItems.map((item, index) => (
              <Item key={index} item={item}></Item>
            ))}
            <div className="pt-6 pb-10">
              <Pagination totalPage={totalPage} page={parseInt(page)} />
            </div>
          </div>
        ) : (
          <Loading />
        )}
      </div>
    </div>
  )
}

export default Page
