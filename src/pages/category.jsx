import { Routes, Route, useParams } from "react-router-dom"
import RecipeRow from "../components/RecipeRow"
import RecipeRowCard from "../components/RecipeRowCard"
import Page from "../components/page"
import call from "../api/api"
import { useEffect, useState } from "react"
import { enqueueSnackbar } from "notistack"

export default function Category() {
  let { categoryId } = useParams()
  const [recipes, setRecipes] = useState([])
  const [category, setCategory] = useState(null)
  useEffect(() => {
    call({
      entity: "Recipe",
      where: {
        and: {
          status: "PUBLISHED",
          category_id: categoryId,
        },
      },
      orderby: "created_at desc",
    })
      .then((response) => response.json())
      .then((json) => setRecipes(json))

    call({
      entity: "Category",
      where: {
        and: {
          id: categoryId,
        },
      },
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.length > 0) {
          setCategory(json[0])
        } else {
          enqueueSnackbar("Category not found", {
            variant: "error",
          })
        }
      })
  }, [])
  return (
    <Page>
      {category && (
        <RecipeRow title={`Category >> ${category.name}`}>
          {!recipes && "Loading..."}
          {recipes && recipes.map((recipe) => <RecipeRowCard key={recipe.id} {...recipe} />)}
        </RecipeRow>
      )}

      {!category && <RecipeRow title={``}>Loading...</RecipeRow>}
    </Page>
  )
}
