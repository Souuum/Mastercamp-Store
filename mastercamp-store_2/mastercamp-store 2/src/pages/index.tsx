import Link from "next/link"
import Layout from "src/core/layouts/Layout"
import { useCurrentUser } from "src/users/hooks/useCurrentUser"
import logout from "src/auth/mutations/logout"
import { useMutation } from "@blitzjs/rpc"
import { Routes, BlitzPage } from "@blitzjs/next"
import { useAllRecipes } from "src/recipes/hooks/useAllRecipes"
import styles from "src/styles/Home.module.css"
import NavBar from "src/core/components/NavBar"
import { Suspense, useEffect, useState } from "react"
import RecipeRow from "src/recipes/components/RecipeRow"
import RecipeRowCard from "src/recipes/components/RecipeRowCard"
import { useRecipe } from "src/recipes/hooks/useRecipe"
import { Recipe } from "@prisma/client"
import { useAllCategories } from "src/categories/hooks/useAllCategories"
import Footer from "src/core/components/Footer"
/*
 * This file is just for a pleasant getting started page for your new app.
 * You can delete everything in here and start from scratch if you like.
 */

const UserInfo = () => {
  const currentUser = useCurrentUser()
  const [logoutMutation] = useMutation(logout)

  if (currentUser) {
    return (
      <>
        <button
          className={styles.button}
          onClick={async () => {
            await logoutMutation()
          }}
        >
          Logout
        </button>
        <div>
          User id: <code>{currentUser.id}</code>
          <br />
          User role: <code>{currentUser.role}</code>
        </div>
      </>
    )
  } else {
    return (
      <>
        <Link href={Routes.SignupPage()} className={styles.button}>
          <strong>Sign Up</strong>
        </Link>
        <Link href={Routes.LoginPage()} className={styles.loginButton}>
          <strong>Login</strong>
        </Link>
      </>
    )
  }
}

const CategoriesInfos = () => {
  const recipies = useAllRecipes()
  const categories = useAllCategories()

  const [dishesOfTheDay, setDishesOfTheDay] = useState<Recipe[]>([])
  useEffect(() => {
    if (recipies) {
      setDishesOfTheDay(
        recipies.sort((a: Recipe, b: Recipe) => (a.createdAt > b.createdAt ? 1 : 0)).slice(0, 5)
      )
    }
  }, [recipies])

  return (
    <>
      <RecipeRow title="Dishes of the Day">
        {!dishesOfTheDay && "Loading..."}
        {dishesOfTheDay &&
          dishesOfTheDay.map((recipe) => <RecipeRowCard key={recipe.id} recipeId={recipe.id} />)}
      </RecipeRow>
      <RecipeRow title="Categories">
        {!categories && "Loading..."}
        {categories &&
          categories.map((category) => (
            <Link
              key={category.id}
              href={Routes.CategoryPage({ categoryId: category.id })}
              className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
            >
              {category.name}
            </Link>
          ))}
      </RecipeRow>
    </>
  )
}

const Home: BlitzPage = () => {
  return (
    <Layout title="Home">
      <div className={styles.globe} />
      <Suspense>
        <NavBar />
      </Suspense>
      <div>
        <div className="relative isolate px-6 pt-14 lg:px-8">
          <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
            <div className="hidden sm:mb-8 sm:flex sm:justify-center">
              <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                Read the site rules{" "}
                <Link href={Routes.Rules()} className="font-semibold text-indigo-600">
                  <span className="absolute inset-0" aria-hidden="true"></span>Read more{" "}
                  <span aria-hidden="true">&rarr;</span>
                </Link>
              </div>
            </div>
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                Plate for all palates !
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600">Find recipes that fit you best</p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Link
                  href={Routes.List()}
                  className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  See all recipes
                </Link>
              </div>
            </div>
          </div>
          <div
            className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
            aria-hidden="true"
          >
            <div
              className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
            ></div>
          </div>
        </div>
        <Suspense fallback="Loading...">
          <CategoriesInfos />
        </Suspense>

        <Footer />
      </div>
    </Layout>
  )
}

export default Home
