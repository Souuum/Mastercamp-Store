import { useQuery } from "@blitzjs/rpc"
import getCategory from "../queries/getCategory"

export const useCategory = (categoryId) => {
  const category = useQuery(getCategory, { id: categoryId })
  return category
}
