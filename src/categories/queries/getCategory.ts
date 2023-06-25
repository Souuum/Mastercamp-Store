import db from "db"
import * as z from "zod"
import { Ctx } from "blitz"

const GetCategory = z.object({
  id: z.number(),
})

export default async function getCategory(input, ctx: Ctx) {
  console.log("in getCategory")
  console.log(input)

  const data = GetCategory.parse(input)

  ctx.session.$authorize()

  const category = await db.category.findUnique({
    where: { id: data.id },
  })
  return category
}
