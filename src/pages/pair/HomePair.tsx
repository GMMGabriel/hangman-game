/* eslint-disable no-restricted-globals */
/* eslint-disable array-callback-return */
import { FormEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse as arrowBack, faFlagCheckered as iconFinishCompetition } from '@fortawesome/free-solid-svg-icons'

import { Modal } from '../../components/Modal'
import { Game } from '../../components/pair/Game'
import { Button } from '../../components/Button'

import '../../styles/pair/home-pair.scss'

export function HomePair() {
  const navigate = useNavigate()

  const [started, setStarted] = useState<boolean>(false)
  const [toFinish, setToFinish] = useState<boolean>(false)
  const [toBackHome, setToBackHome] = useState<boolean>(false)

  const [players, setPlayers] = useState<[string, string]>(['Jogador 1', 'Jogador 2'])
  const [definedNamePlayers, setDefinedNamePlayers] = useState<[boolean, boolean]>([true, true])
  const [qtdWins, setQtdWins] = useState<[number, number]>([0, 0])
  let sumQtdWins = calculateSumQtdWins()

  const [indexPlayerWin, setIndexPlayerWin] = useState<number>(0)

  const [playerChooseKeyword, setPlayerChooseKeyword] = useState<number>(0)

  const [keyword, setKeyword] = useState('')
  const [hint, setHint] = useState('')

  function calculateSumQtdWins() {
    return qtdWins.reduce((accumulator, value) => accumulator + value, 0)
  }

  function handleFormEdit(e: FormEvent, p: string) {
    e.preventDefault()
    toggleStatusNamePlayer(p)
  }

  function toggleStatusNamePlayer(p: string) {
    if (p === "p1") {
      setDefinedNamePlayers(arr => [!arr[0], arr[1]])
      return
    }
    setDefinedNamePlayers(arr => [arr[0], !arr[1]])
  }

  function startGame() {
    setPlayerChooseKeyword(player => (player + 1) % 2)
    setStarted(true)
  }

  function nextRound() {
    setStarted(false)
    setKeyword("")
    setHint("")
    document.getElementsByClassName("player-turn")[0].classList.remove("none")
  }

  function gameOver(playerStatus: boolean) { // o jogo acabou (não significa que perdeu, apenas que o jogo acabou!)
    /**
     * Caso o valor de playerStatus seja false,
     * significa que o jogador que estava jogando perdeu.
     * Se for true, significa que ele ganhou!
     */

    document.getElementsByClassName("player-turn")[0].classList.add("none")

    if (playerStatus) {
      if (playerChooseKeyword) {
        setQtdWins(value => [value[0], value[1] + 1])
      } else {
        setQtdWins(value => [value[0] + 1, value[1]])
      }
    } else {
      if (playerChooseKeyword) {
        setQtdWins(value => [value[0] + 1, value[1]])
      } else {
        setQtdWins(value => [value[0], value[1] + 1])
      }
    }
  }

  function finishCompetition(_toBackHome: boolean = false) {
    if (confirm("A competição será finalizada!")) {
      if (qtdWins[0] === qtdWins[1]) {
        setIndexPlayerWin(-1)
      } else {
        setIndexPlayerWin(qtdWins.indexOf(qtdWins.reduce((prev, current) => {
          return prev > current ? prev : current
        })))
      }
      setToFinish(true)
      setToBackHome(_toBackHome)
    }
  }

  function resetDatas() {
    /**
     * Reseta todos os dados para começar uma nova competição
     */

    setStarted(false)
    setToFinish(false)
    setToBackHome(false)
    setKeyword("")
    setHint("")
    setQtdWins([0, 0])
    sumQtdWins = 0
    setPlayerChooseKeyword(0)
    setIndexPlayerWin(0)
    document.getElementsByClassName("player-turn")[0].classList.remove("none")
  }

  // window.addEventListener("beforeunload", function (e) {
  //   return e.returnValue = "Mensagem de aviso";
  // });

  function backToHome(forceOut: boolean = false) {
    if (toBackHome || forceOut) {
      navigate("/")
    } else {
      resetDatas()
    }
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    sumQtdWins = calculateSumQtdWins()
  }, [qtdWins])

  return (
    <div id="page-home-pair">
      <Modal
        isOpen={toFinish}
        onRequestClose={() => backToHome()}>
        <h1>
          {indexPlayerWin === -1 ? (
            "Empate!"
          ) : (
            players[indexPlayerWin]
          )}
        </h1>
        <p>
          {indexPlayerWin === -1 ? (
            "A competição resultou em empate"
          ) : (
            `${players[indexPlayerWin]} vence ${players[(indexPlayerWin + 1) % 2]}`
          )}
          <br />placar final:
        </p>
        <p><b>{players[0]}</b> {qtdWins[0]} x {qtdWins[1]} <b>{players[1]}</b></p>
        <Button id="button-ok" onClick={() => backToHome()}>Ok</Button>
      </Modal>
      <header>
        <h1 className="title-page">Dois jogador</h1>
        <hr />
        <div id="players" className={`turn-${playerChooseKeyword}`}>
          <div className="box-player p1">
            {definedNamePlayers[0] ? (
              <div className="show">
                <span title={players[0]}>{players[0]}</span>
                <Button onClick={() => toggleStatusNamePlayer("p1")} title="Alterar o nome do jogador 1">Alterar</Button>
              </div>
            ) : (
              <form onSubmit={event => handleFormEdit(event, "p1")} className="edit">
                <input
                  type="text"
                  name="player1"
                  id="player1"
                  value={players[0]}
                  onChange={event => setPlayers(arr => [event.target.value, arr[1]])} />
                <Button>Pronto</Button>
              </form>
            )}
          </div>

          <div className="scoreboard">
            <div className="scores score-player1">{qtdWins[0]}</div>
            <div className="vs">VS</div>
            <div className="scores score-player2">{qtdWins[1]}</div>
          </div>

          <div className="box-player p2">
            {definedNamePlayers[1] ? (
              <div className="show">
                <span title={players[1]}>{players[1]}</span>
                <Button onClick={() => toggleStatusNamePlayer("p2")} title="Alterar o nome do jogador 2">Alterar</Button>
              </div>
            ) : (
              <form onSubmit={event => handleFormEdit(event, "p2")} className="edit">
                <input
                  type="text"
                  name="player2"
                  id="player2"
                  value={players[1]}
                  onChange={event => setPlayers(arr => [arr[0], event.target.value])} />
                <Button>Pronto</Button>
              </form>
            )}
          </div>
        </div>
      </header>

      {started ? (
        <>
          <h2 className="player-turn"><strong>{players[playerChooseKeyword]}</strong>,<br />tente adivinhar a palavra-chave desta {sumQtdWins + 1}ª rodada. Boa sorte.</h2>
          <Game keyword={keyword} hint={hint ? hint : ""} gameOver={gameOver} nextRound={nextRound} finishCompetition={finishCompetition} />
        </>
      ) : (
        <>
          <h2 className="player-turn"><strong>{players[playerChooseKeyword]}</strong>,<br />digite a palavra-chave da {sumQtdWins + 1}ª rodada.</h2>

          <main>
            <form id="form-pair" onSubmit={startGame}>
              <div className="fields">
                <label htmlFor="keyword">Palavra-chave *</label>
                <input
                  type="text"
                  name="keyword"
                  id="keyword"
                  value={keyword}
                  onChange={event => setKeyword(event.target.value.toUpperCase())} />
              </div>
              <div className="fields">
                <label htmlFor="hint">Dica</label>
                <textarea
                  name="hint"
                  id="hint"
                  value={hint}
                  onChange={event => setHint(event.target.value)}></textarea>
              </div>
              <Button disabled={keyword.trim() === ""}>Começar</Button>
            </form>

            <div className="actions-home">
              {calculateSumQtdWins() > 0 ? (
                <>
                  <Button onClick={() => finishCompetition(true)}>
                    <FontAwesomeIcon icon={arrowBack} /> Página inicial
                  </Button>
                  <Button onClick={() => finishCompetition()}>
                    <FontAwesomeIcon icon={iconFinishCompetition} /> Finalizar competição
                  </Button>
                </>
              ) : (
                <Button onClick={() => backToHome(true)}>
                  <FontAwesomeIcon icon={arrowBack} /> Página inicial
                </Button>
              )}
            </div>
          </main>
        </>
      )}
    </div>
  )
}