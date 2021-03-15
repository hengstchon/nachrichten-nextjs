import Head from 'next/head'
import { useRouter } from 'next/router'
import Nav from '../components/nav'
import Page from '../components/page'
import { fetcher } from '../lib/utils'
import useSWR from 'swr'

export default function Content() {
  const router = useRouter()
  const cat = router.query.cat || ''
  const page = router.query.page || '1'
  const { data } = useSWR(`/api/${cat}?page=${page}`, fetcher)
  console.log('data: ', data)
  const { navName, totalPage, pageItems } = data || {}

  return (
    <div className="bg-bg text-white">
      <Head>
        <title>Nachrichten</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Nav navName={navName} />

      {pageItems && (
        <Page pageItems={pageItems} totalPage={totalPage} page={page} />
      )}
    </div>
  )
}
