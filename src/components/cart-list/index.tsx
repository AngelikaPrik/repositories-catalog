import { IListRepositories } from '@models/repositories-model'
import { CartItem } from '../cart-item'

import style from './cart-list.module.scss'

export const CartList = (props: PropsType) => {
  const { data, filter } = props
  
  return (
    <>
      {data.length ? (
        <div className={style.container} data-testid="cart-list">
          {data.map(item => (
            <CartItem key={item.url} {...item} />
          ))}
        </div>
      ) : (
        <p>Repository with "{filter}" name was not found</p>
      )}
    </>
  )
}

interface PropsType {
  data: IListRepositories
  filter: string
}
