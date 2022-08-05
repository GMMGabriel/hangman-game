import { Link } from 'react-router-dom'

import '../styles/home.scss'

export function Home() {

  return (
    <div id="page-home">
      <main>
        <h1 className="title-page">Jogo da forca 1.0.0</h1>

        <nav>
          <Link to="/singleplayer">Um jogador</Link>
          <Link to="/credits">Créditos</Link>
        </nav>
      </main>
    </div>
  )
}