import style from './pagination.module.scss'

export const Pagination = (props: PropsType) => {
  const { currentPage, totalPages, onChangePage } = props

  return (
    <div className={style.pagination}>
      {Array.from({ length: totalPages }, (_, index) => index + 1).map(page => (
        <div
          className={`${style.pagination__item} ${
            page === currentPage ? style.active : ''
          }`}
          key={page}
          onClick={() => onChangePage(page)}
        >
          {page}
        </div>
      ))}
    </div>
  )
}

interface PropsType {
  currentPage: number
  totalPages: number
  onChangePage: (pageNum: number) => void
}
