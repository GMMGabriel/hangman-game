import packageJson from '../../package.json'

import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser as onePlayer, faUserFriends as twoPlayers, faGlobe as multiplayer, faCopyright as credits, faLock } from '@fortawesome/free-solid-svg-icons'

import { useTheme } from '../hooks/useTheme'

import '../styles/home.scss'

export function Home() {
  const { changeTheme } = useTheme()

  return (
    <div id="page-home">
      <main>
        <h1 className="title-page">Jogo da forca {packageJson.version}</h1>

        <nav>
          <Link to="/singleplayer">
            <FontAwesomeIcon icon={onePlayer} />Um jogador
          </Link>
          <Link to="/pair">
            <FontAwesomeIcon icon={twoPlayers} />Dois jogadores
          </Link>
          <Link to="/multiplayer">
            <FontAwesomeIcon icon={multiplayer} />Multiplayer
            <div className="lock">
              <FontAwesomeIcon icon={faLock} />
            </div>
          </Link>
          <Link to="/credits">
            <FontAwesomeIcon icon={credits} />Créditos
          </Link>
        </nav>

        <div className="change-color-theme">
          <p>mudar o tema da aplicação</p>
          <ul className="theme-list">
            <li><button className="button-theme-blue" onClick={() => changeTheme('theme-blue')}></button></li>
            <li><button className="button-theme-green" onClick={() => changeTheme('theme-green')}></button></li>
            <li><button className="button-theme-turqoise" onClick={() => changeTheme('theme-turqoise')}></button></li>
            <li><button className="button-theme-red" onClick={() => changeTheme('theme-red')}></button></li>
            <li><button className="button-theme-purple" onClick={() => changeTheme('theme-purple')}></button></li>
          </ul>
        </div>
      </main>
    </div>
  )
}
