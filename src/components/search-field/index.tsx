import { ChangeEvent } from 'react'
import clean from '@assets/images/close-icon.svg'
import search from '@assets/images/search-icon.svg'

import style from './search-field.module.scss'

export const SearchField = (props: PropsType) => {
  const { value, placeholder, type, onChange, onClean } = props

  return (
    <div className={style.search}>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        data-testid="search-field-input"
      />
      {!value && <img src={search} alt='search icon' />}
      {value && (
        <div className={style.clean} onClick={onClean} data-testid="search-field-clean-button">
          <img src={clean} alt='clean icon' />
        </div>
      )}
    </div>
  )
}

interface PropsType {
  value: string
  placeholder: string
  type: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  onClean: () => void
}
