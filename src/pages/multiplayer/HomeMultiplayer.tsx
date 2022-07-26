import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../../hooks/useAuth';

import { Button } from '../../components/Button';
import { UserView } from '../../components/UserView';

import googleIconImg from '../../assets/images/google-icon.svg'

import '../../styles/multiplayer/home-multiplayer.scss'

export function HomeMultiplayer() {
  const { user, signInWithGoogle } = useAuth();
  const navigate = useNavigate(); // para utilizar navegação entre páginas

  // codeRoom
  const [codeRoom, setCodeRoom] = useState('')

  async function handleLoginWithGoogle() {
    if (!user) {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      await signInWithGoogle();
    }
    navigate("/room/new"); // muda de página
  }

  return (
    <div id="page-home-multiplayer">
      <header>
        <UserView />
      </header>
      <main>
        <div className="box">
          <div className="area-login">
            <h3>Crie uma sala de jogo</h3>
            <button className="to-login" onClick={handleLoginWithGoogle}>
              <img src={googleIconImg} alt="Logo do Google" />
              Crie com o Google
            </button>
          </div>
          <div className="area-to-enter-the-room">
            <h3>Ou entre em uma</h3>
            <form>
              <input
                type="text"
                name="codeRoom"
                id="codeRoom"
                placeholder='Código da sala'
                value={codeRoom}
                onChange={event => setCodeRoom(event.target.value)}
              />
              <Button type="submit" disabled={codeRoom.trim() === ''}>Entrar</Button>
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}