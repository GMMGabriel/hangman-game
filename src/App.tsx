import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthContextProvider } from './contexts/AuthContext';

// <PAGES> ============================================================
import { Home } from './pages/Home';

import { HomeSingleplayer } from './pages/singleplayer/HomeSingleplayer';
import { Play } from './pages/singleplayer/Play';

import { HomeMultiplayer } from './pages/multiplayer/HomeMultiplayer';
import { NewRoom } from "./pages/NewRoom";
import { Room } from "./pages/Room";

import { Credits } from './pages/Credits';

import { Test } from './pages/Test';

import { NotFound } from './pages/NotFound';
// </PAGES> ============================================================

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/singleplayer" element={<HomeSingleplayer />} />
          <Route path="/singleplayer/:cat" element={<Play />} />

          {/* <Route path="/multiplayer" element={<HomeMultiplayer />} />
          <Route path="/multiplayer/room/new" element={<NewRoom />} />
          <Route path="/multiplayer/room/:id" element={<Room />} /> */}

          <Route path="/credits" element={<Credits />} />

          {/* <Route path="/teste" element={<Test />} /> */}

          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
