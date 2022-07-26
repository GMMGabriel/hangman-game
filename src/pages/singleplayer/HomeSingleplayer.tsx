/* eslint-disable array-callback-return */
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse as iconBackHome } from '@fortawesome/free-solid-svg-icons'

import { categories, translatedCategories } from '../../categoriesSingleplayer/categories'

import '../../styles/singleplayer/home-singleplayer.scss'

export function HomeSingleplayer() {
  // const {changeTheme: toggleTheme} = useTheme()
  const cats = categories()
  const tc = Object.entries(translatedCategories())

  return (
    <div id="page-home-singleplayer">
      <main>
        <h1 className="title-page">Um jogador</h1>

        <span>Escolha uma das categorias abaixo:</span>
        <nav>
          <>
            <Link to="/singleplayer/random" className="outline">Aleatória</Link>
            {Object.entries(cats).map((value, key) => {
              return <Link key={key} to={`/singleplayer/${tc[key][0]}`}>{tc[key][1]}</Link>
            })}
            <Link to="/" className="button go-back">
              <FontAwesomeIcon icon={iconBackHome} /> Voltar
            </Link>
          </>
        </nav>
      </main>
    </div>
  )
}