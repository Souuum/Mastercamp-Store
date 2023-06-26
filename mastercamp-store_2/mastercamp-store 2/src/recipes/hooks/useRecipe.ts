import { useQuery } from "@blitzjs/rpc"
import getRecipe from "../queries/getRecipe"
export const useRecipe = (recipeId) => {
  const recipe = useQuery(getRecipe, { id: recipeId })

  return recipe
}
