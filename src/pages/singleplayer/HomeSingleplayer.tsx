/* eslint-disable array-callback-return */
import { Link } from 'react-router-dom'

import { categories, translatedCategories } from '../../categoriesSingleplayer/categories'
import { Button } from '../../components/Button'
import { useTheme } from '../../hooks/useTheme'

import '../../styles/singleplayer/home-singleplayer.scss'

export function HomeSingleplayer() {
  const {changeTheme: toggleTheme} = useTheme()
  const cats = categories()
  const tc = Object.entries(translatedCategories())

  function changeColors() {
    /**
     * Tentar isso depois:
     * document.documentElement.style.setProperty('--background', 'black');
     */
    // const bg = "#7A363F"
    // document.body.style.setProperty('--bg', bg)
    // const dark = "#7A111F"
    // document.body.style.setProperty('--dark', dark)
    // const midle = "#C71B33"
    // document.body.style.setProperty('--midle', midle)
    // const light = "#FA2340"
    // document.body.style.setProperty('--light', light)
    // const details = "#FB6E81"
    // document.body.style.setProperty('--details', details)
    localStorage.setItem('theme', 'theme-green')
  }

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
              Voltar
            </Link>
          </>
        </nav>
      </main>
    </div>
  )
}