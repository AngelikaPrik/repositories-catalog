import { Link } from 'react-router-dom'
import { IRepository } from '@models/repositories-model'
import moment from 'moment'
import star from '@assets/images/star.svg'

import style from './cart-item.module.scss'

export const CartItem = (props: IRepository) => {
  const { name, stargazerCount, updatedAt, url, owner } = props
  const dateCommit = moment(updatedAt).format('DD.MM.YYYY')

  return (
    <div className={style.cart} data-testid="cart-item">
      <div>
        <div className={style.cart__top}>
          <Link to={`/${owner.login}/${name}`}>
            <h3 data-testid="cart-item-title" className={style.cart__title}>{name}</h3>
          </Link>
          <div className={style.star}>
            <p>{stargazerCount}</p>
            <img src={star} alt='star' />
          </div>
        </div>
        <p className={style.commit}>Last commit: {dateCommit}</p>
      </div>
      <a className={style.cart__link} href={url} target='_blank'>
        {url}
      </a>
    </div>
  )
}
