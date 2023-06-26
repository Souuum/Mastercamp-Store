import { BlitzPage, useParams } from "@blitzjs/next"
import RecipeRowCard from "src/recipes/components/RecipeRowCard"
import { useQuery } from "@blitzjs/rpc"
import getRecipe from "src/recipes/queries/getRecipe"
import { useState, useEffect, Suspense } from "react"
import Layout from "src/core/layouts/Layout"
import { useRecipe } from "src/recipes/hooks/useRecipe"
import NavBar from "src/core/components/NavBar"
import { useCategory } from "src/categories/hooks/useCategory"
import { useAllRecipes } from "src/recipes/hooks/useAllRecipes"
import { Category, Recipe } from "@prisma/client"
import RecipeRow from "src/recipes/components/RecipeRow"

const CategoryRecipies = ({ categoryId }) => {
  const category = useCategory(categoryId)[0]
  const [categoryRecipes, setCategoryRecipes] = useState<Recipe[]>([])
  const recipies = useAllRecipes()

  useEffect(() => {
    if (recipies) {
      setCategoryRecipes(recipies.filter((r) => r.categoryId == category?.id))
    }
  }, [category?.id, recipies])

  return (
    <RecipeRow title={`Category >> ${category?.name}`}>
      {!categoryRecipes && "Loading..."}
      {categoryRecipes &&
        categoryRecipes.map((recipe) => <RecipeRowCard key={recipe.id} recipeId={recipe.id} />)}
    </RecipeRow>
  )
}

const CategoryPage: BlitzPage = () => {
  const { categoryId } = useParams()
  console.log(categoryId)

  return (
    <Layout title={"Category"}>
      <Suspense fallback="Loading...">
        <Suspense>
          <NavBar />
        </Suspense>
        <div>
          <Suspense fallback="Loading...">
            <CategoryRecipies categoryId={Number(categoryId)} />
          </Suspense>
        </div>
      </Suspense>
    </Layout>
  )
}

export default CategoryPage
