import { Link } from 'react-router-dom'
import style from './not-found.module.scss'

export const NotFoundPage = () => {
  return (
    <div className={style.container}>
      <div className={style.box}>
        <h1>Oops! You seem to be lost.</h1>
        <Link to='/'>
          <div className={style.back}>Back</div>
        </Link>
      </div>
    </div>
  )
}
