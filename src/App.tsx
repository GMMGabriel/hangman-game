import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { AuthContextProvider } from './contexts/AuthContext';
import { ThemeContextProvider } from './contexts/ThemeContext';

// <PAGES> ============================================================
// PÁGINA INICIAL
import { Home } from './pages/Home';

// UM JOGADOR
import { HomeSingleplayer } from './pages/singleplayer/HomeSingleplayer';
import { Play as SingleplayerPlay } from './pages/singleplayer/Play';

// DOIS JOGADORES
import { HomePair } from './pages/pair/HomePair';
// import { Play as PairPlay } from './pages/pair/Play';

// CRÉDITOS
import { Credits } from './pages/Credits';

// PÁGINA NÃO ENCONTRADA
import { NotFound } from './pages/NotFound';
// </PAGES> ============================================================

function App() {

  return (
    <ThemeContextProvider>
      <AuthContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/singleplayer" element={<HomeSingleplayer />} />
            <Route path="/singleplayer/:cat" element={<SingleplayerPlay />} />

            <Route path="/pair" element={<HomePair />} />

            <Route path="/credits" element={<Credits />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthContextProvider>
    </ThemeContextProvider>
  );
}

export default App;
