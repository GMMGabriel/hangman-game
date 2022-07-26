/* eslint-disable array-callback-return */
import { useParams } from "react-router-dom";
import { categories, translatedCategories } from "../../categoriesSingleplayer/categories";
import { Game } from "../../components/Game";
import { NotFound } from "../NotFound";

type GameParams = {
  cat: string;
}

export function Play() {
  const params = useParams<GameParams>()
  const tc = Object.entries(translatedCategories())
  const infos = tc.map(([key, value], index) => {
    if (params.cat === key) {
      return [value, index]
    }
  }).filter(item => {
    return item !== undefined
  })[0]
  console.log(infos);

  if (infos !== undefined) {
    return (
      <Game category={params.cat} infosCategory={infos} />
      // <h1>Play</h1>
    )
  } else {
    return (
      <NotFound />
    )
  }
}