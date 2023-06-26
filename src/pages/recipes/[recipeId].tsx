import { BlitzPage, useParams } from "@blitzjs/next"
import { useState, useEffect, Suspense } from "react"
import Layout from "src/core/layouts/Layout"
import { useRecipe } from "src/recipes/hooks/useRecipe"
import NavBar from "src/core/components/NavBar"
import Footer from "src/core/components/Footer"

const RecipePage: BlitzPage = () => {
  const [recipeId, setRecipeId] = useState(1)
  const paramId = useParams("number")

  useEffect(() => {
    console.log("in")
    console.log(paramId.recipeId)
    setRecipeId(paramId.recipeId)
  }, [paramId])

  const recipe = useRecipe(recipeId)[0]
  return (
    <Layout title={recipe.title}>
      <Suspense>
        <NavBar />
      </Suspense>
      <div>
        {!recipe && "Loading..."}
        {recipe && (
          <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="mx-auto mt-6 max-w-2xl lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 content-center">
              <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
                <img
                  src={
                    recipe.image ||
                    "https://images.wondershare.com/repairit/aticle/2021/07/resolve-images-not-showing-problem-1.jpg"
                  }
                  alt="Two each of gray, white, and black shirts laying flat."
                  className="h-full w-full object-cover object-center"
                />
              </div>
              {recipe.video && (
                <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
                  <iframe width="500" height="320" src={recipe.video}>
                    {" "}
                  </iframe>
                </div>
              )}
            </div>

            <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
              <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                  {recipe.title}
                </h1>
              </div>
              <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
                <h3 className="text-sm font-medium text-gray-900">Time : {recipe.time}</h3>
                {recipe.difficulty && (
                  <h3 className="text-sm font-medium text-gray-900">
                    Difficulty : {recipe.difficulty} / 5
                  </h3>
                )}
                {recipe.ingredients && (
                  <div className="mt-10">
                    <h3 className="text-sm font-medium text-gray-900">Ingredients</h3>

                    <div className="mt-4">
                      <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                        {recipe.ingredients.split(",").map((e) => (
                          <li key={e} className="text-gray-400">
                            <span className="text-gray-600">{e}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                <div className="mt-10">
                  <h2 className="text-sm font-medium text-gray-900">Details</h2>

                  <div className="mt-4 space-y-6">
                    <p
                      className="text-sm text-gray-600"
                      dangerouslySetInnerHTML={{ __html: recipe.content }}
                    ></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </Layout>
  )
}

export default RecipePage
