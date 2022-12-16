/* eslint-disable no-restricted-globals */
/* eslint-disable array-callback-return */
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShare as arrowNextTurn, faFlagCheckered as iconFinishCompetition } from '@fortawesome/free-solid-svg-icons'

import { Button } from '../../components/Button'

import gallows0Img from '../../assets/images/gallows_0.svg'
import gallows1Img from '../../assets/images/gallows_1.svg'
import gallows2Img from '../../assets/images/gallows_2.svg'
import gallows3Img from '../../assets/images/gallows_3.svg'
import gallows4Img from '../../assets/images/gallows_4.svg'
import gallows5Img from '../../assets/images/gallows_5.svg'
import gallows6Img from '../../assets/images/gallows_6.svg'

import '../../styles/pair/game-pair.scss'

type GameProps = {
  keyword: string;
  gameOver: (playerStatus: boolean) => void;
  nextRound: () => void;
  finishCompetition: (_toBackHome?: boolean) => void;
  hint?: string;
}

export function Game(props: GameProps) {
  // <VARIÁVEIS> ============================================================

  // const [keyword, setKeyword] = useState<string>(props.keyword)
  const keyword = props.keyword

  const qtdLetters = keyword.replaceAll(' ', '').split('').length
  const qtdWords = keyword.split(' ').length

  // Contador de letras restantes (que faltam acertar)
  const [remainingLetters, setRemainingLetters] = useState(keyword.replace(' ', '').length)
  // Guarda as letras certas
  const [rightLetters, setRightLetters] = useState<string[]>([])
  // Guarda as letras já tentadas
  const [alreadyTested, setAlreadyTested] = useState<string[]>([])

  // Booleano para verificar se a partida foi encerrada
  const [finished, setFinished] = useState(false)
  // Constante que guarda a quantidade de chances que o jogador tem
  const [chances, setChances] = useState(6)
  // Constante que guarda a imagem de acordo com a quantidade de chances que o jogador tem
  const [gallowsImg, setGallowsImg] = useState(gallows0Img)

  const accentedLetters: {
    'A': string[];
    'E': string[];
    'I': string[];
    'O': string[];
    'U': string[];
    'C': string[];
  } = {
    'A': ['Á', 'À', 'Ã', 'Â',],
    'E': ['É', 'È', 'Ê',],
    'I': ['Í', 'Ì', 'Î',],
    'O': ['Ó', 'Ò', 'Õ', 'Ô',],
    'U': ['Ú', 'Ù', 'Û',],
    'C': ['Ç',],
  }

  // </VARIÁVEIS> ============================================================

  // <USEEFFECT> ============================================================

  useEffect(() => {
    // Aqui é feito a troca de imagem das etapas
    switch (chances) {
      case 0:
        setGallowsImg(gallows6Img)
        setFinished(true)
        props.gameOver(false)
        break;
      case 1:
        setGallowsImg(gallows5Img)
        break;
      case 2:
        setGallowsImg(gallows4Img)
        break;
      case 3:
        setGallowsImg(gallows3Img)
        break;
      case 4:
        setGallowsImg(gallows2Img)
        break;
      case 5:
        setGallowsImg(gallows1Img)
        break;
      default:
        setGallowsImg(gallows0Img)
        break;
    }
  }, [chances])

  useEffect(() => {
    let remaining = keyword.replaceAll(' ', '')
    for (const l of rightLetters) {
      remaining = remaining.replaceAll(l, '')
    }
    setRemainingLetters(remaining.length)
  }, [rightLetters, keyword])

  useEffect(() => {
    if (remainingLetters === 0) {
      setFinished(true)
      props.gameOver(true)
    }
  }, [remainingLetters])

  // </USEEFFECT> ============================================================

  function keyClicked(k: string) {
    if (!alreadyTested.includes(k)) {
      setAlreadyTested(arr => [...arr, k])
    } else {
      return
    }

    let flag = false
    if (['A', 'E', 'I', 'O', 'U', 'C'].includes(k)) {
      switch (k) {
        case 'A':
          for (const l of accentedLetters.A) {
            if (keyword.includes(l)) {
              setRightLetters(arr => [...arr, l])
              flag = true
            }
          }
          break;
        case 'E':
          for (const l of accentedLetters.E) {
            if (keyword.includes(l)) {
              setRightLetters(arr => [...arr, l])
              flag = true
            }
          }
          break;
        case 'I':
          for (const l of accentedLetters.I) {
            if (keyword.includes(l)) {
              setRightLetters(arr => [...arr, l])
              flag = true
            }
          }
          break;
        case 'O':
          for (const l of accentedLetters.O) {
            if (keyword.includes(l)) {
              setRightLetters(arr => [...arr, l])
              flag = true
            }
          }
          break;
        case 'U':
          for (const l of accentedLetters.U) {
            if (keyword.includes(l)) {
              setRightLetters(arr => [...arr, l])
              flag = true
            }
          }
          break;
        case 'C':
          for (const l of accentedLetters.C) {
            if (keyword.includes(l)) {
              setRightLetters(arr => [...arr, l])
              flag = true
            }
          }
          break;
      }
    }

    if (keyword.includes(k) || flag) {
      setRightLetters(arr => [...arr, k])
    } else {
      setChances(state => state - 1)
    }
  }

  return (
    <main id="game">
      {/* <h1 className="title-game">Você consegue!</h1> */}

      {/* <div className="hearts-life">
          <figure>
            <img src={heartsImg} alt={`Imagem da forca restando ${chances} chance(s)`} />
          </figure>
        </div> */}
      <div className="show-gallows">
        <figure>
          <img src={gallowsImg} alt={`Imagem da forca restando ${chances} chance(s)`} />
        </figure>
      </div>

      {!finished ? (
        <>
          <div id="letters">
            {keyword.split('').map((l, key) => {
              if (rightLetters.includes(l)) {
                return <span key={key} className="letter">{l}</span>
              } else if (l === ' ') {
                return <span key={key} className="separator"></span>
              } else {
                return <span key={key} className="letter">&nbsp;</span>
              }
            })}
          </div>

          <div className="hint">
            <h2>{qtdLetters} letra{qtdLetters > 1 && 's'} / {qtdWords} palavra{qtdWords > 1 && 's'}</h2>
            {props.hint && (
              <h3>Dica: <small>{props.hint}</small></h3>
            )}
          </div>

          <div className="keyboard">
            <p>
              {["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"].map((l, key) => {
                return (
                  <Button key={key} isKey type="button" onClick={() => keyClicked(l)} disabled={alreadyTested.includes(l)}>{l}</Button>
                )
              })}
            </p>
            <p>
              <span></span>
              {["A", "S", "D", "F", "G", "H", "J", "K", "L"].map((l, key) => {
                return (
                  <Button key={key} isKey type="button" onClick={() => keyClicked(l)} disabled={alreadyTested.includes(l)}>{l}</Button>
                )
              })}
              <span></span>
            </p>
            <p>
              <span></span>
              <span></span>
              {["Z", "X", "C", "V", "B", "N", "M"].map((l, key) => {
                return (
                  <Button key={key} isKey type="button" onClick={() => keyClicked(l)} disabled={alreadyTested.includes(l)}>{l}</Button>
                )
              })}
              <span></span>
              <span></span>
            </p>
          </div>

          <div className="actions">
            <Button onClick={() => props.finishCompetition()}>
              <FontAwesomeIcon icon={iconFinishCompetition} /> Finalizar competição
            </Button>
          </div>
        </>
      ) : (
        <>
          {remainingLetters === 0 ? (
            <>
              <h2>{keyword}</h2>
              <div className="final-message winner">
                <p>Você acertou! Parabéns!</p>
                {chances > 1 ? chances === 6 ? (
                  <p>Com <span className="remaining-chances-6">6</span> chances restantes. Que demais!</p>
                ) : (
                  <p>Com <span className={`remaining-chances-${chances}`}>{chances}</span> chances restantes</p>
                ) : (
                  <p>Com apenas <span className="remaining-chances-1">1</span> chance restando... por pouco hein?!</p>
                )}
              </div>
            </>
          ) : (
            <>
              <div className="final-message defeated">
                <p>Você não acertou :{'('}</p>
                {qtdWords === 1 ? (
                  <p>A palavra era:</p>
                ) : (
                  <p>As palavras eram:</p>
                )}
              </div>
              <h2>{keyword}</h2>
            </>
          )}
          <div className="actions">
            <Button onClick={props.nextRound}>
              Próxima rodada <FontAwesomeIcon icon={arrowNextTurn} />
            </Button>
            <Button onClick={() => props.finishCompetition()}>
              <FontAwesomeIcon icon={iconFinishCompetition} /> Finalizar competição
            </Button>
          </div>
        </>
      )}
    </main>
  )
}