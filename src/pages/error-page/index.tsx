import style from './error.module.scss'

export const ErrorPage = () => {
  return (
    <div className={style.container}>
      <div className={style.box}>
        <h1>Oops! Something goes wrong :(</h1>
      </div>
    </div>
  )
}
