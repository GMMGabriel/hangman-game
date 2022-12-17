<style>
  h1 {
    text-align: center;
  }
  h1 img {
    max-width: 100%
  }
  .images {
    display: flex;
    gap: 1rem;
  }
  @media only screen and (max-width: 1000px) {
    .images {
      flex-direction: column;
    }
  }
  .images img {
    max-width: 100%;
  }
</style>

# Hangman-game (Jogo da forca)

<h1>
  <img href="prints/home.png" alt="Hangman-game (Jogo da forca)">
</h1>

## 💻 Sobre o projeto

Projeto pessoal, que comecei a fazer para por em prática conhecimentos adiquiridos nos estudos sobre [ReactJs](https://reactjs.org/).

## 🧪 Tecnologias

- [ReactJs](https://reactjs.org/);
- [TypeScript](https://www.typescriptlang.org/);
- [Firebase](https://firebase.google.com/) (futuramente, será usado para autenticação no modo multijogador);
- [Supabase](https://supabase.com/) (futuramente, será usado no modo multijogador).

## ⚙️ Funcionalidades

- Um jogador;
<div class="images">
  <img href="images/singleplayer1.png">
  <img href="images/singleplayer2.png">
</div>
O jogador tem algumas opções de categorias como "Países", "Comidas", entre outras. São palavras predefinidas. Além dessas, a primeira opção é "Aleatória", onde a cada rodada, será selecionada uma categoria aleatória e uma palavra aleatória dessa categoria.

- Dois jogadores;
<div class="images">
  <img href="images/twoPlayers1.png">
  <img href="images/twoPlayers2.png">
</div>
Padrão de jogos de forca, uma pessoa digita uma palavra e a outra tenta acertar, e vice-versa.

- Multiplayer.
Ainda em desenvolvimento.