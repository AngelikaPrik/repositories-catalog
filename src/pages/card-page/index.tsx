import { useNavigate, useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { Loader, StyledButton } from '@components'
import { NotFoundPage } from '@pages'
import { GET_SINGLE_REPOSITORY } from '@services/queries'
import moment from 'moment'
import star from '@assets/images/star.svg'
import ghIcon from '@assets/images/github-icon.png'

import style from './card.module.scss'

export const CardPage = () => {
  const navigate = useNavigate()
  const { nameOfRep, login } = useParams()

  const { loading, data, error } = useQuery(GET_SINGLE_REPOSITORY, {
    variables: { name: nameOfRep, owner: login },
  })

  const dateCommit = moment(data?.repository.updatedAt).format('DD.MM.YYYY')

  if (error) return <NotFoundPage />

  return (
    <div className={style.container}>
      <StyledButton onClick={() => navigate('/')}>
        <p>Back</p>
      </StyledButton>
      {loading ? (
        <Loader />
      ) : (
        <div className={style.card}>
          <div className={style.card__top}>
            <h3>{data.repository.name}</h3>
            <div className={style.star}>
              <p>{data.repository.stargazerCount}</p>
              <img src={star} alt='star' />
            </div>
          </div>
          <p className={style.commit}>Last commit: {dateCommit}</p>
          <div className={style.card__body}>
            <div className={style.owner}>
              <div className={style.owner__avatar}>
                <img
                  width={60}
                  src={data.repository.owner.avatarUrl || ghIcon}
                  alt='avatar'
                />
              </div>
              <div className={style.owner__nick}>
                <p className={style.card__subtitle}>Owner: </p>
                <a href={data.repository.owner.url} target='_blank'>
                  {data.repository.owner.login}
                </a>
              </div>
            </div>
            <div className={style.lang}>
              <p className={style.card__subtitle}>Languages: </p>
              <div className={style.lang__box}>
                {data.repository.languages.nodes.map(
                  (l: Record<string, string>) => (
                    <p key={l.name} className={style.lang__item}>
                      {l.name}
                    </p>
                  )
                )}
              </div>
            </div>
            <div className={style.desc}>
              <p className={style.card__subtitle}>Description: </p>
              <p>{data.repository.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
