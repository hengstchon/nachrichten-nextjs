import { useRouter } from 'next/router'

const Pagination = ({ totalPage, page }) => {
  const router = useRouter()
  const { cat } = router.query
  console.log('category: ', cat)

  // https://dev.to/namirsab/comment/2050
  const range = (start, end) => {
    const length = end - start + 1
    return Array.from({ length }, (_, i) => start + i)
  }

  const count = totalPage
  const boundaryCount = 1
  const hideNextButton = false
  const hidePrevButton = false
  const showFirstButton = false
  const showLastButton = false
  const siblingCount = 1

  const startPages = range(1, Math.min(boundaryCount, count))
  const endPages = range(
    Math.max(count - boundaryCount + 1, boundaryCount + 1),
    count
  )
  const siblingsStart = Math.max(
    Math.min(
      // Natural start
      page - siblingCount,
      // Lower boundary when page is high
      count - boundaryCount - siblingCount * 2 - 1
    ),
    // Greater than startPages
    boundaryCount + 2
  )
  console.log('siblingsStart: ', siblingsStart)

  const siblingsEnd = Math.min(
    Math.max(
      // Natural end
      page + siblingCount,
      // Upper boundary when page is low
      boundaryCount + siblingCount * 2 + 2
    ),
    // Less than endPages
    endPages.length > 0 ? endPages[0] - 2 : count - 1
  )
  console.log('siblingsEnd: ', siblingsEnd)

  // Basic list of items to render
  // e.g. itemList = ['first', 'previous', 1, 'ellipsis', 4, 5, 6, 'ellipsis', 10, 'next', 'last']
  const itemList = [
    ...(showFirstButton ? ['first'] : []),
    ...(hidePrevButton ? [] : ['previous']),
    ...startPages,

    // Start ellipsis
    // eslint-disable-next-line no-nested-ternary
    ...(siblingsStart > boundaryCount + 2
      ? ['start-ellipsis']
      : boundaryCount + 1 < count - boundaryCount
      ? [boundaryCount + 1]
      : []),

    // Sibling pages
    ...range(siblingsStart, siblingsEnd),

    // End ellipsis
    // eslint-disable-next-line no-nested-ternary
    ...(siblingsEnd < count - boundaryCount - 1
      ? ['end-ellipsis']
      : count - boundaryCount > boundaryCount
      ? [count - boundaryCount]
      : []),

    ...endPages,
    ...(hideNextButton ? [] : ['next']),
    ...(showLastButton ? ['last'] : []),
  ]

  console.log('itemList: ', itemList)

  const buttonPage = type => {
    switch (type) {
      case 'previous':
        return page - 1
      case 'next':
        return page + 1
      default:
        return null
    }
  }

  const handleClick = (e, page) => {
    e.preventDefault()
    router.push(`/${cat}?page=${page}`)
  }

  // Convert the basic item list to PaginationItem props objects
  const items = itemList.map(item => {
    return typeof item === 'number'
      ? {
          onClick: event => {
            handleClick(event, item)
          },
          type: 'page',
          page: item,
          selected: item === page,
          disabled: false,
        }
      : {
          onClick: event => {
            handleClick(event, buttonPage(item))
          },
          type: item,
          page: buttonPage(item),
          selected: false,
          disabled:
            item.indexOf('ellipsis') === -1 &&
            (item === 'next' || item === 'last' ? page >= count : page <= 1),
        }
  })

  const renderButton = item => {
    const { type, page, selected, disabled, onClick } = item
    return (
      <a
        className={`cursor-pointer text-white text-sm w-7 h-7 inline-flex justify-center items-center rounded-full ${
          selected ? 'text-gray-900 bg-yellow-400 text-sm' : ''
        } ${disabled ? 'cursor-default	opacity-40' : ''}`}
        onClick={disabled ? undefined : onClick}
      >
        {type === 'page' && page}
        {type === 'previous' && '<'}
        {type === 'next' && '>'}
      </a>
    )
  }

  const renderItem = item => {
    const { type } = item
    if (type === 'start-ellipsis' || type === 'end-ellipsis') {
      return <div className="w-7 h-7 text-white">…</div>
    } else {
      return renderButton(item)
    }
  }

  return (
    <>
      <ul className="flex justify-center space-x-2">
        {items.map((item, index) => (
          <li key={index}>{renderItem(item)}</li>
        ))}
      </ul>
    </>
  )
}

export default Pagination
