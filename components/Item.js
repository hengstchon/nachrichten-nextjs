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
        className="text-xl font-medium hover:underline"
      >
        {title}
      </a>
      <div className="text-sm pt-2 text-gray-500">
        {dayjs(isoDate).fromNow()}
      </div>
      <div className="pt-2 text-gray-700">{content}</div>
    </div>
  )
}

export default Item
