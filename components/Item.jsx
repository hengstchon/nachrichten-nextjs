import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

const Item = ({ item }) => {
  const { title, link, content, isoDate } = item
  dayjs.extend(relativeTime)

  return (
    <div className="py-6 px-2">
      <a
        href={link}
        target="_blank"
        className="text-xl font-medium leading-tight text-white hover:underline text-blue-400"
      >
        {title}
      </a>
      <div className="text-sm pt-2 text-gray-400">
        {dayjs(isoDate).fromNow()}
      </div>
      <div className="text-sm pt-2">{isoDate}</div>
      <div className="pt-2 text-text">{content}</div>
    </div>
  )
}

export default Item
