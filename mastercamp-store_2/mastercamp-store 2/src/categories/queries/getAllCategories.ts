import db from "db"

export default async function getAllCategories(_ = null) {
  const categories = await db.category.findMany({
    select: { id: true, name: true },
  })

  return categories
}
