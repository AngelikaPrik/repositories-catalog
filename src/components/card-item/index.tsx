import { Link } from 'react-router-dom'
import { IRepository } from '@models/repositories-model'
import moment from 'moment'
import star from '@assets/images/star.svg'

import style from './card-item.module.scss'

export const CardItem = (props: IRepository) => {
  const { name, stargazerCount, updatedAt, url, owner } = props
  const dateCommit = moment(updatedAt).format('DD.MM.YYYY')

  return (
    <div className={style.card} data-testid="card-item">
      <div>
        <div className={style.card__top}>
          <Link to={`/${owner.login}/${name}`}>
            <h3 data-testid="card-item-title" className={style.card__title}>{name}</h3>
          </Link>
          <div className={style.star}>
            <p>{stargazerCount}</p>
            <img src={star} alt='star' />
          </div>
        </div>
        <p className={style.commit}>Last commit: {dateCommit}</p>
      </div>
      <a className={style.card__link} href={url} target='_blank'>
        {url}
      </a>
    </div>
  )
}
