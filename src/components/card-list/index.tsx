import { IListRepositories } from '@models/repositories-model'
import { CardItem } from '../card-item'

import style from './card-list.module.scss'

export const CardList = (props: PropsType) => {
  const { data, filter } = props

  return (
    <>
      {data.length ? (
        <div className={style.container} data-testid='card-list'>
          {data.map(item => (
            <CardItem key={item.url} {...item} />
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
