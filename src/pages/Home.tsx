import { Link } from 'react-router-dom'

import { useTheme } from '../hooks/useTheme'

import '../styles/home.scss'

export function Home() {
  const { changeTheme } = useTheme()

  return (
    <div id="page-home">
      <main>
        <h1 className="title-page">Jogo da forca 1.0.0</h1>

        <nav>
          <Link to="/singleplayer">Um jogador</Link>
          <Link to="/credits">Créditos</Link>
        </nav>

        <div className="change-color-theme">
          <p>mudar o tema da aplicação</p>
          <ul className="theme-list">
            <li><button className="button-theme-blue" onClick={() => changeTheme('theme-blue')}></button></li>
            <li><button className="button-theme-green" onClick={() => changeTheme('theme-green')}></button></li>
            <li><button className="button-theme-red" onClick={() => changeTheme('theme-red')}></button></li>
          </ul>
        </div>
      </main>
    </div>
  )
}