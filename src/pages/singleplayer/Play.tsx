/* eslint-disable array-callback-return */
import { useParams } from "react-router-dom";
import { categories, translatedCategories } from "../../categoriesSingleplayer/categories";
import { Game } from "../../components/singleplayer/Game";
import { NotFound } from "../NotFound";

type GameParams = {
  cat: string;
}

export function Play() {
  const params = useParams<GameParams>()
  const tc = Object.entries(translatedCategories())

  let infos = undefined
  if (params.cat !== "random") {
    infos = getInfos(params.cat)
  } else {
    if (params.cat === "random") {
      const arrCategories = Object.entries(categories())
      const categorySelected = arrCategories[Math.floor(Math.random() * arrCategories.length)]
      infos = getInfos(categorySelected[0])
    }
  }

  function getInfos(nameCat: string | undefined) {
    return tc.map(([nameEn, namePtBr], indexItem) => {
      if (nameCat === nameEn) {
        return [namePtBr, indexItem]
      }
    }).filter(item => {
      return item !== undefined
    })[0]
  }

  if (infos !== undefined) {
    return (
      <Game category={params.cat} infosCategory={infos} />
    )
  } else {
    return (
      <NotFound />
    )
  }
}