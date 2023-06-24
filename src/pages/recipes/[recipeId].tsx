import { BlitzPage, useParams } from "@blitzjs/next"
import RecipeRowCard from "src/recipes/components/RecipeRowCard"
import { useQuery } from "@blitzjs/rpc"
import getRecipe from "src/recipes/queries/getRecipe"
import { useState, useEffect, Suspense } from "react"
import Layout from "src/core/layouts/Layout"

const RecipePage: BlitzPage = () => {
  const [recipeId, setRecipeId] = useState(1)
  const paramId = useParams("number")

  useEffect(() => {
    console.log("in")
    console.log(paramId.recipeId)
    setRecipeId(paramId.recipeId)
  }, [paramId])

  return (
    <div>
      <Suspense>
        <RecipeRowCard {...{ recipeId }} />
      </Suspense>
    </div>
  )
}

export default RecipePage
