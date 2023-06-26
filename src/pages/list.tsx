import { BlitzPage } from "@blitzjs/auth"
import NavBar from "src/core/components/NavBar"
import Layout from "src/core/layouts/Layout"
import { Suspense, useEffect, useState } from "react"
import { useAllCategories } from "src/categories/hooks/useAllCategories"
import { useAllRecipes } from "src/recipes/hooks/useAllRecipes"
import Footer from "src/core/components/Footer"
import { Recipe } from "@prisma/client"
import RecipeRowCard from "src/recipes/components/RecipeRowCard"
import { useCurrentUser } from "src/users/hooks/useCurrentUser"
import Link from "next/link"
import { Routes } from "@blitzjs/next"
import styles from "src/styles/Home.module.css"
function Page() {
  const [recipies, setRecipies] = useState<Recipe[]>([])
  const cacheRecipies = useAllRecipes()
  const categories = useAllCategories()
  const [ingredients, setIngredients] = useState([])
  const [selectedIngredients, setSelectedIngredients] = useState([])
  const [selectedCategories, setSelectedCategories] = useState([])
  const [searchRecipeName, setSearchRecipeName] = useState("")

  useEffect(() => {
    setRecipies(cacheRecipies)
    setIngredients([
      ...new Set(cacheRecipies.flatMap((recipe) => (recipe.ingredients || "").split(","))),
    ])
  }, [cacheRecipies])

  const selectIngredients = (i) => {
    setSelectedIngredients((pre) => {
      if (!selectedIngredients.includes(i)) {
        return [...new Set([...pre, i])]
      }
      const newPre = pre.filter((p) => p != i)
      return [...new Set([...newPre])]
    })
  }

  const selectCategories = (i) => {
    setSelectedCategories((pre) => {
      if (!selectedCategories.includes(i)) {
        return [...new Set([...pre, i])]
      }
      const newPre = pre.filter((p) => p != i)
      return [...new Set([...newPre])]
    })
  }

  const search = () => {
    setRecipies((pre) => {
      return cacheRecipies.filter((p) => {
        return (
          (selectedCategories.length == 0 || selectedCategories.includes(p.category_id)) &&
          (selectedIngredients.length == 0 ||
            selectedIngredients.filter((si) => p.ingredients.includes(si)).length ==
              selectedIngredients.length) &&
          (searchRecipeName == "" || p.title.includes(searchRecipeName))
        )
      })
    })
  }

  

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
      <div className="flex">
        <div className="w-1/4 bg-gray-200" style={{ padding: "15px" }}>
          <input
            id="search"
            name="search"
            type="text"
            value={searchRecipeName}
            onChange={(e) => setSearchRecipeName(e.target.value)}
            required
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
          <h3 style={{ marginBottom: "5px" }}>Ingredients</h3>
          {ingredients &&
            ingredients.map(
              (i) =>
                i != "" && (
                  <div key={i} className="flex items-center mb-4">
                    <input
                      id={`c-${i}`}
                      type="checkbox"
                      onChange={(e) => selectIngredients(i)}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label className="ml-2 text-sm font-medium text-white-900 dark:text-white-300">
                      {i}
                    </label>
                  </div>
                )
            )}
          <h3 style={{ marginBottom: "5px" }}>Categories</h3>

          {categories &&
            categories.map((c) => (
              <div key={c.id} className="flex items-center mb-4">
                <input
                  id={`c-${c.id}`}
                  type="checkbox"
                  onChange={(e) => selectCategories(c.id)}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label className="ml-2 text-sm font-medium text-white-900 dark:text-white-300">
                  {c.name}
                </label>
              </div>
            ))}

          <button
            type="button"
            onClick={search}
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Search
          </button>
        </div>

        <div className="w-3/4 bg-white" style={{ padding: "10px" }}>
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
            {!recipies && "Loading..."}
            {recipies &&
              recipies.map((recipe) => <RecipeRowCard key={recipe.id} recipeId={recipe.id} />)}
          </div>
        </div>
      </div>
    </div>
  )
}

const List: BlitzPage = () => {

const currentUser = useCurrentUser()

if(currentUser){
  return (
    <Layout title="Categories">
      <Suspense>
        <NavBar />
      </Suspense>
      <div>
        <Suspense fallback="Loading...">
          <Page />
        </Suspense>

        <Footer />
      </div>
    </Layout>
  )}
  else{ return (
    <Layout title="Categories">
      <Suspense>
        <NavBar />
      </Suspense>
      <div>
        <Suspense fallback="Loading...">
        <Link href={Routes.SignupPage()} className={styles.button}>
          <strong>Sign Up</strong>
        </Link>
        <Link href={Routes.LoginPage()} className={styles.loginButton}>
          <strong>Login</strong>
        </Link>
        </Suspense>

        <Footer />
      </div>
    </Layout>
    )}
}

export default List
