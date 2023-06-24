import { Routes, Route } from "react-router-dom"
import Page from "../components/page"
import { useEffect, useState } from "react"
import call from "../api/api"
import RecipeRowCard from "../components/RecipeRowCard"
import RecipeRow from "../components/RecipeRow"

export default function List() {
  const [recipies, setRecipies] = useState([])
  const [cacheRecipies, setCacheRecipies] = useState([])
  const [categories, setCategories] = useState([])
  const [ingredients, setIngredients] = useState([])
  const [selectedIngredients, setSelectedIngredients] = useState([])
  const [selectedCategories, setSelectedCategories] = useState([])
  const [searchRecipeName, setSearchRecipeName] = useState("")

  useEffect(() => {
    call({
      entity: "Recipe",
      where: {
        and: {
          status: "PUBLISHED",
        },
      },
      orderby: "created_at desc",
    })
      .then((response) => response.json())
      .then((json) => {
        setRecipies(json)
        setCacheRecipies(json)
        setIngredients([
          ...new Set(json.flatMap((recipe) => (recipe.ingredients || "").split(","))),
        ])
      })

    call({
      entity: "Category",
    })
      .then((response) => response.json())
      .then((json) => setCategories(json))
  }, [])

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
    <Page>
      <div class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div class="flex">
          <div class="w-1/4 bg-gray-200" style={{ padding: "15px" }}>
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
            {ingredients.map(
              (i) =>
                i != "" && (
                  <div key={i} class="flex items-center mb-4">
                    <input
                      id={`c-${i}`}
                      type="checkbox"
                      onChange={(e) => selectIngredients(i)}
                      class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      for={`c-${i}`}
                      class="ml-2 text-sm font-medium text-white-900 dark:text-white-300"
                    >
                      {i}
                    </label>
                  </div>
                )
            )}
            <h3 style={{ marginBottom: "5px" }}>Categories</h3>
            {categories.map((c) => (
              <div key={c.id} class="flex items-center mb-4">
                <input
                  id={`c-${c.id}`}
                  type="checkbox"
                  onChange={(e) => selectCategories(c.id)}
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  for={`c-${c.id}`}
                  class="ml-2 text-sm font-medium text-white-900 dark:text-white-300"
                >
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

          <div class="w-3/4 bg-white" style={{ padding: "10px" }}>
            <div class="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
              {!recipies && "Loading..."}
              {recipies && recipies.map((recipe) => <RecipeRowCard key={recipe.id} {...recipe} />)}
            </div>
          </div>
        </div>
      </div>
    </Page>
  )
}
