import Head from 'next/head'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import Nav from '../components/Nav'
import Page from '../components/Page'
import { fetcher } from '../lib/utils'

export default function Content() {
  const router = useRouter()
  const cat = router.query.cat || ''
  const page = router.query.page || '1'
  const { data } = useSWR(`/api/${cat}?page=${page}`, fetcher)
  const { navName, totalPage, pageItems } = data || {}
  return (
    <div className="bg-bg text-white">
      <Head>
        <title>Nachrichten</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Nav navName={navName} />

      <Page pageItems={pageItems} totalPage={totalPage} page={page} />
    </div>
  )
}
