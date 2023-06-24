import { useEffect, useState } from "react"
import RecipeRow from "../components/RecipeRow"
import RecipeRowCard from "../components/RecipeRowCard"
import Page from "../components/page"
import call from "../api/api"
import { Link } from "react-router-dom"

export default function Index() {
  const [dishesOfTheDay, setDishesOfTheDay] = useState([])
  const [categories, setCategories] = useState([])
  useEffect(() => {
    call({
      entity: "Recipe",
      where: {
        and: {
          status: "PUBLISHED",
        },
      },
      orderby: "created_at desc",
      limit: 5,
    })
      .then((response) => response.json())
      .then((json) => setDishesOfTheDay(json))

    call({
      entity: "Category",
    })
      .then((response) => response.json())
      .then((json) => setCategories(json))
  }, [])

  return (
    <Page>
      <div class="relative isolate px-6 pt-14 lg:px-8">
        <div class="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div class="hidden sm:mb-8 sm:flex sm:justify-center">
            <div class="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
              Read the site rules{" "}
              <Link to={"/rules"} class="font-semibold text-indigo-600">
                <span class="absolute inset-0" aria-hidden="true"></span>Read more{" "}
                <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </div>
          <div class="text-center">
            <h1 class="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Plate for all palates !
            </h1>
            <p class="mt-6 text-lg leading-8 text-gray-600">Find the recipe that's right for you</p>
            <div class="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="#"
                class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                See recipe
              </a>
            </div>
          </div>
        </div>
        <div
          class="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          aria-hidden="true"
        >
          <div
            class="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          ></div>
        </div>
      </div>
      <RecipeRow title="Dishes of the Day">
        {!dishesOfTheDay && "Loading..."}
        {dishesOfTheDay &&
          dishesOfTheDay.map((recipe) => <RecipeRowCard key={recipe.id} {...recipe} />)}
      </RecipeRow>
      <RecipeRow title="Categories">
        {!categories && "Loading..."}
        {categories &&
          categories.map((category) => (
            <Link
              key={category.id}
              to={`/category/${category.id}`}
              className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
            >
              {category.name}
            </Link>
          ))}
      </RecipeRow>
    </Page>
  )
}
