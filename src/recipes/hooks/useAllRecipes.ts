import { useQuery } from "@blitzjs/rpc"
import getAllRecipes from "../queries/getAllRecipes"
export const useAllRecipes = () => {
  const [recipes] = useQuery(getAllRecipes, null)
  return recipes
}
