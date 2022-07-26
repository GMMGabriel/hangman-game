/* eslint-disable array-callback-return */
import { Link } from 'react-router-dom'

import { categories, translatedCategories } from '../../categoriesSingleplayer/categories'

import '../../styles/singleplayer/home-singleplayer.scss'

export function HomeSingleplayer() {
  const cats = categories()
  const tc = Object.entries(translatedCategories())

  return (
    <div id="page-home-singleplayer">
      <main>
        <h1 className="title-page">Um jogador</h1>

        <span>Escolha uma das categorias abaixo:</span>
        <nav>
          <>
            {Object.entries(cats).map((value, key) => {
              return <Link to={`/singleplayer/${tc[key][0]}`}>{tc[key][1]}</Link>
            })}
            <Link to="/" className="button go-back">
              Voltar
            </Link>
          </>
        </nav>
      </main>
    </div>
  )
}