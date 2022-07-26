import { useEffect, useState } from 'react'

import { Button } from '../components/Button'

import gallows0Img from '../assets/images/gallows_0.svg'
import gallows1Img from '../assets/images/gallows_1.svg'
import gallows2Img from '../assets/images/gallows_2.svg'
import gallows3Img from '../assets/images/gallows_3.svg'
import gallows4Img from '../assets/images/gallows_4.svg'
import gallows5Img from '../assets/images/gallows_5.svg'
import gallows6Img from '../assets/images/gallows_6.svg'

import hearts0Img from '../assets/images/hearts0.svg'
import hearts1Img from '../assets/images/hearts1.svg'
import hearts2Img from '../assets/images/hearts2.svg'
import hearts3Img from '../assets/images/hearts3.svg'
import hearts4Img from '../assets/images/hearts4.svg'
import hearts5Img from '../assets/images/hearts5.svg'
import hearts6Img from '../assets/images/hearts6.svg'

import '../styles/room.scss'

export function Room() {
  // <VARIÁVEIS> ============================================================
  // Booleano para verificar se a partida foi encerrada
  const [finished, setFinished] = useState(false)
  // Constante que guarda a quantidade de chances que o jogador tem
  const [chances, setChances] = useState(6)
  // Constante que guarda a imagem de acordo com a quantidade de chances que o jogador tem
  const [gallowsImg, setGallowsImg] = useState(gallows0Img)
  const [heartsImg, setHeartsImg] = useState(hearts0Img)

  // Constante que guarda a palavra secreta
  // const [keyword] = useState('AÁÀÃÂEÉÈÊIÍÌÎOÓÒÕÔUÚÙÛCÇ')
  const [keyword] = useState('PALAVRA CHAVE')
  // const [keyword] = useState('TESTE TESTE TESTE')

  const qtdLetters = keyword.replaceAll(' ', '').split('').length
  const qtdWords = keyword.split(' ').length

  // Contador de letras restantes (que faltam acertar)
  const [remainingLetters, setRemainingLetters] = useState(keyword.replace(' ', '').length)
  // Guarda as letras certas
  const [rightLetters, setRightLetters] = useState<string[]>([])
  // Guarda as letras já tentadas
  const [alreadyTested, setAlreadyTested] = useState<string[]>([])

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
        setHeartsImg(hearts0Img)
        setFinished(true)
        break;
      case 1:
        setGallowsImg(gallows5Img)
        setHeartsImg(hearts1Img)
        break;
      case 2:
        setGallowsImg(gallows4Img)
        setHeartsImg(hearts2Img)
        break;
      case 3:
        setGallowsImg(gallows3Img)
        setHeartsImg(hearts3Img)
        break;
      case 4:
        setGallowsImg(gallows2Img)
        setHeartsImg(hearts4Img)
        break;
      case 5:
        setGallowsImg(gallows1Img)
        setHeartsImg(hearts5Img)
        break;
      default:
        setGallowsImg(gallows0Img)
        setHeartsImg(hearts6Img)
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
    }
  }, [remainingLetters])

  // </USEEFFECT> ============================================================

  function keyClicked(k: string) {
    if (!alreadyTested.includes(k)) {
      alreadyTested.push(k)
      setAlreadyTested(alreadyTested)
    }

    if (keyword.includes(k) && (!rightLetters.includes(k) || ['A', 'E', 'I', 'O', 'U', 'C'].includes(k))) {
      if (!rightLetters.includes(k)) {
        setRightLetters(arr => [...arr, k])
      }
      if (['A', 'E', 'I', 'O', 'U', 'C'].includes(k)) {
        switch (k) {
          case 'A':
            for (const l of accentedLetters.A) {
              setRightLetters(arr => [...arr, l])
            }
            break;
          case 'E':
            for (const l of accentedLetters.E) {
              setRightLetters(arr => [...arr, l])
            }
            break;
          case 'I':
            for (const l of accentedLetters.I) {
              setRightLetters(arr => [...arr, l])
            }
            break;
          case 'O':
            for (const l of accentedLetters.O) {
              setRightLetters(arr => [...arr, l])
            }
            break;
          case 'U':
            for (const l of accentedLetters.U) {
              setRightLetters(arr => [...arr, l])
            }
            break;
          case 'C':
            for (const l of accentedLetters.C) {
              setRightLetters(arr => [...arr, l])
            }
            break;
        }
      }
      // console.log(`${word.replace(' ', '').length} - ${rightLetters.length} = ${word.replace(' ', '').length - rightLetters.length}`);
    } else {
      setChances(state => state - 1)
    }

    // const buttonLetter = document.querySelector(`.letter-${k}`)
    // if (buttonLetter) {
    //   buttonLetter.setAttribute('disabled', 'true')
    // }
  }

  return (
    <div id="page-room">
      <main>
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
                  return <span key={key} className="letter">&nbsp;&nbsp;</span>
                }
              })}
            </div>

            <div className="hint">
              <h2>{qtdLetters} letra{qtdLetters > 1 && 's'} / {qtdWords} palavra{qtdWords > 1 && 's'}</h2>
              <h3>Dica: <small>Aqui é onde vem a dica!</small></h3>
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
                {["A", "S", "D", "F", "G", "H", "J", "K", "L"].map((l, key) => {
                  return (
                    <Button key={key} isKey type="button" onClick={() => keyClicked(l)} disabled={alreadyTested.includes(l)}>{l}</Button>
                  )
                })}
              </p>
              <p>
                {["Z", "X", "C", "V", "B", "N", "M"].map((l, key) => {
                  return (
                    <Button key={key} isKey type="button" onClick={() => keyClicked(l)} disabled={alreadyTested.includes(l)}>{l}</Button>
                  )
                })}
              </p>
            </div>
          </>
        ) : (
          <>
            {remainingLetters === 0 ? (
              <>
                <h2>{keyword}</h2>
                <div className="final-message winner">
                  <p>Você ganhou, parabéns!</p>
                  <p>Com {chances} chances restante{chances > 1 && 's'}</p>
                </div>
              </>
            ) : (
              <>
                <div className="final-message defeated">
                  <p>Você perdeu :{'('}</p>
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
              <a href="/multiplayer/room/1" className="button">Jogar novamente</a>
            </div>
          </>
        )}

        {/* <button type="button" onClick={handleGallowsImg}>Mudar imagem</button> */}
      </main>
    </div>
  )
}