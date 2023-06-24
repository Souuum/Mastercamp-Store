import { useQuery } from "@blitzjs/rpc"
import getAllCategories from "../queries/getAllCategories"
export const useAllCategories = () => {
  const [categories] = useQuery(getAllCategories, null)
  return categories
}
