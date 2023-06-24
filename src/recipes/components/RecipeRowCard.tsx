import Link from "next/link"
import { Routes } from "@blitzjs/next"
import { useRecipe } from "../hooks/useRecipe"
export default function RecipeRowCard({ recipeId }) {
  console.log(recipeId)
  const recipe = useRecipe(recipeId)[0]
  console.log(recipe)
  return (
    <div className="group relative">
      <div className="min-h-80 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
        <img
          src={
            recipe.image ||
            "https://images.wondershare.com/repairit/aticle/2021/07/resolve-images-not-showing-problem-1.jpg"
          }
          alt={`${recipe.title}`}
          className="h-full w-full object-cover object-center lg:h-full lg:w-full"
        />
      </div>
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm text-black">
            <Link href={Routes.Recipes()}>
              <span aria-hidden="true" className="absolute inset-0">
                {recipe.title}
              </span>
            </Link>
          </h3>
          <p className="mt-1 text-sm text-gray-500">Time : {recipe.time}</p>
        </div>
      </div>
    </div>
  )
}
