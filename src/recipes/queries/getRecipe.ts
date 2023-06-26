import db from "db"
import * as z from "zod"
import { Ctx } from "blitz"

const GetRecipe = z.object({
  id: z.number(),
})

export default async function getRecipe(input, ctx: Ctx) {
  console.log("in getRecipe")
  console.log(input)

  const data = GetRecipe.parse(input)

  //ctx.session.$authorize()

  const recipe = await db.recipe.findUnique({
    where: { id: data.id },
  })
  return recipe
}
