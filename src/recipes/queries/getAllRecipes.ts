import db from "db"

export default async function getAllRecipes(_ = null) {
  const recipes = await db.recipe.findMany({})
  console.log(recipes)
  return recipes
}
