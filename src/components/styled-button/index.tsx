import style from "./styled-button.module.scss"

export const StyledButton = (props: PropsType) => {
  const { onClick, children } = props
  return <button className={style.btn} onClick={onClick}>{children}</button>
}

interface PropsType {
  children: JSX.Element
  onClick: () => void
}
