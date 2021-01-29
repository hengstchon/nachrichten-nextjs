import Parser from 'rss-parser'
import { feeds } from '../config/feeds'

const CORS_PROXY = 'https://cors.netnr.workers.dev/'

export const getAllPaths = () => {
  return feeds.map(({ cat }) => ({
    params: {
      cat,
    },
  }))
}

const fetchDataFromRssUrl = async rssUrl => {
  const parser = new Parser()
  const res = await parser.parseURL(CORS_PROXY + rssUrl)
  return res
}

const clean = data => {
  //   console.log('data: ', data)
  const { title, link, description, items } = data
  const newItems = items
    .sort((a, b) => new Date(b.isoDate) - new Date(a.isoDate))
    .slice(0, Math.min(30, items.length))
    .map(i => {
      const { title, link, contentSnippet, isoDate } = i
      const content = contentSnippet ? contentSnippet : ''
      return { title, link, content, isoDate }
    })
  return { title, link, description, items: newItems }
}

export const getFeedData = async cat => {
  const feedData = feeds.find(f => f.cat === cat)
  const { navName, rssUrl } = feedData
  const data = await fetchDataFromRssUrl(feedData.rssUrl)
  const newData = clean(data)
  return { cat, navName, rssUrl, data: newData }
}
