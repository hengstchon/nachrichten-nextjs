import Item from './item'

const Page = ({ pageItems }) => {
  return (
    <div className="flex">
      <div className="lg:w-64 invisible"></div>
      <div className="container lg:max-w-screen-md mx-auto px-2 mt-5 divide-y">
        {pageItems.map((item, index) => (
          <Item key={index} item={item}></Item>
        ))}
      </div>
    </div>
  )
}

export default Page
