import { CartPage, MainPage, NotFoundPage } from '@pages'
import { Routes, Route } from 'react-router-dom'

import style from './app.module.scss'

function App() {
  return (
    <div className={style.container}>
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/:login/:nameOfRep' element={<CartPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </div>
  )
}

export default App
