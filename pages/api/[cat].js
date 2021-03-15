import Parser from 'rss-parser'
import { feeds } from '../../config/feeds'

const CORS_PROXY = 'https://heroku-cors.herokuapp.com/'
const ITEMS_PER_PAGE = 10

const clean = (data, page) => {
  const { title, link, description, items } = data

  // calculate newsItems in current page from all items
  const totalItems = items.length
  const totalPage = Math.ceil(totalItems / ITEMS_PER_PAGE)
  const lastItemNum = parseInt(page) * ITEMS_PER_PAGE
  const firstItemNum = lastItemNum - ITEMS_PER_PAGE

  const pageItems = items
    .sort((a, b) => new Date(b.isoDate) - new Date(a.isoDate))
    .slice(firstItemNum, lastItemNum)
    .map(i => {
      const { title, link, contentSnippet, isoDate } = i
      const content = contentSnippet ? contentSnippet : ''
      return { title, link, content, isoDate }
    })

  return { title, link, description, totalPage, pageItems }
}

const fetchDataFromRssUrl = async rssUrl => {
  const parser = new Parser()
  const res = await parser.parseURL(CORS_PROXY + rssUrl)
  return res
}

const getFeedData = async (cat, page) => {
  const feedData = feeds.find(f => f.cat === cat)
  const { navName, rssUrl } = feedData
  const data = await fetchDataFromRssUrl(feedData.rssUrl)
  const pageData = clean(data, page)
  return { cat, navName, rssUrl, ...pageData }
}

export default async (req, res) => {
  const { cat, page } = req.query
  const feedData = await getFeedData(cat, page)

  res.status(200).json(feedData || {})
}
