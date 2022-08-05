import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { AuthContextProvider } from './contexts/AuthContext';
import { ThemeContextProvider } from './contexts/ThemeContext';

// <PAGES> ============================================================
import { Home } from './pages/Home';

import { HomeSingleplayer } from './pages/singleplayer/HomeSingleplayer';
import { Play } from './pages/singleplayer/Play';

import { Credits } from './pages/Credits';

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
            <Route path="/singleplayer/:cat" element={<Play />} />

            <Route path="/credits" element={<Credits />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthContextProvider>
    </ThemeContextProvider>
  );
}

export default App;
