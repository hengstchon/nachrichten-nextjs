import Head from 'next/head'
import { useRouter } from 'next/router'
import Item from '../components/Item'
import Nav from '../components/Nav'
import Pagination from '../components/Pagination'
import { getAllPaths, getFeedData } from '../lib/utils'

export async function getStaticPaths() {
  const paths = getAllPaths()
  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const { cat } = params
  const feedData = await getFeedData(cat)
  return {
    props: { feedData },
  }
}

export default function Content({ feedData }) {
  const { navName, data } = feedData
  const { items } = data

  const router = useRouter()
  const { pathname, query } = router
  const currentPage = query.page || '1'

  // calculate newsItems in current page from all news
  const itemsPerPage = 10
  const totalItems = items.length
  const totalPage = Math.ceil(totalItems / itemsPerPage)
  const lastItemNum = parseInt(currentPage) * itemsPerPage
  const firstItemNum = lastItemNum - itemsPerPage
  const pageItems = items.slice(firstItemNum, lastItemNum)

  const handlePageClick = data => {
    const selected = data.selected
    router.push({
      pathname,
      query: { ...query, page: selected + 1 },
    })
  }

  return (
    <>
      <Head>
        <title>Nachrichten</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Nav navName={navName} />

      <div className="container md:max-w-screen-md mx-auto px-5 pt-5 divide-y">
        <div className="divide-y">
          {pageItems.map((item, index) => (
            <Item key={index} item={item}></Item>
          ))}
        </div>

        <div className="flex justify-center pt-10 pb-20">
          <Pagination totalPage={totalPage} handlePageClick={handlePageClick} />
        </div>
      </div>
    </>
  )
}
