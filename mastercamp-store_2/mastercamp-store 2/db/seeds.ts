import db from "./index"
import { Prisma, PrismaClient } from "@prisma/client"
/*
 * This seed function is executed when you run `blitz db seed`.
 *
 * Probably you want to use a library like https://chancejs.com
 * to easily generate realistic data.
 */

const seed = async () => {
  // for (let i = 0; i < 5; i++) {
  //   await db.project.create({ data: { name: "Project " + i } })
  // }
  //
  //

  const categories = ["pizza", "burger", "sandwich"]

  for (let i = 3; categories.length; i++) {
    if (categories[i] !== undefined) {
      let c = categories[i]
      try {
        const cat = await db.category.create({ data: { name: "" + c } })
        console.log(cat)
      } catch (err) {
        console.log(err)
      }
    }
  }

  let recipes = [
    {
      title: "pâtes carbonara",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vel quam imperdiet, pulvinar ex vel, facilisis mas",
      time: "10 min",
      difficulty: "2.5",
      image:
        "https://www.thespruceeats.com/thmb/ovIQQQxQajADuIE2lqhgqq7ppyE=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/pasta-carbonara-recipe-5210168-hero-01-80090e56abc04ca19d88ebf7fad1d157.jpg",
      video: "https://www.youtube.com/embed/kqVzOjfRZPk",
      ingredients: "pasta,ham,sauce,gruyere",
      categoryId: 1,
    },
    {
      id: 4,
      title: "Pizza tomato",
      content: "qsdqsdqsdqsd",
      time: "1 min",
      difficulty: "0",
      image: "",
      video: "",
      ingredients: "pizza,tomato",
      categoryId: 2,
    },
  ]

  for (const recipe of recipes) {
    const { title, content, time, difficulty, image, video, ingredients } = recipe
    const category = await db.category.findUnique({ where: { id: recipe.categoryId } })
    console.log(category)

    const createRecipe = await db.recipe.create({
      data: {
        title: title,
        content: content,
        time: time,
        difficulty: difficulty,
        image: image,
        video: video,
        ingredients: ingredients,
        categoryId: category.id,
      },
    })
    console.log("recipe added")
  }
}

export default seed
