import { Suspense } from "react"
import Link from "next/link"
import Layout from "src/core/layouts/Layout"
import { useCurrentUser } from "src/users/hooks/useCurrentUser"
import { useAllRecipes } from "src/recipes/hooks/useAllRecipes"

import logout from "src/auth/mutations/logout"
import { useMutation, useQuery } from "@blitzjs/rpc"
import { Routes, BlitzPage } from "@blitzjs/next"
import styles from "src/styles/Home.module.css"
import RecipeRow from "src/recipes/components/RecipeRow"
import RecipeRowCard from "src/recipes/components/RecipeRowCard"

/*
 * This file is just for a pleasant getting started page for your new app.
 * You can delete everything in here and start from scratch if you like.
 */

const UserInfo = () => {
  const currentUser = useCurrentUser()
  const [logoutMutation] = useMutation(logout)
  const recipes = useAllRecipes()

  if (currentUser) {
    console.log(recipes)
    return (
      <div className="flex flex-col justify-center items-center">
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
        <div className={styles.body}>
          <div className="flex flex-row w-full space-x-4">
            {recipes.map((recipe) => (
              <RecipeRowCard key={recipe.id} recipeId={recipe.id} />
            ))}
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <>
        <div className="flex flex-col h-80 justify-center items-center space-y-4">
          <h1 className="">You must be connected to access this page</h1>
          <div className="space-x-4">
            <Link href={Routes.SignupPage()} className={styles.button}>
              <strong>Sign Up</strong>
            </Link>
            <Link href={Routes.LoginPage()} className={styles.loginButton}>
              <strong>Login</strong>
            </Link>
          </div>
        </div>
      </>
    )
  }
}

const Recipes: BlitzPage = () => {
  return (
    <Layout title="Home">
      <div className={styles.globe} />

      <div className={styles.container}>
        <main className={styles.main}>
          <div className={styles.wrapper}>
            <div className={styles.header}>
              <div className={styles.logo}></div>

              <div className={styles.buttonContainer}>
                <Suspense fallback="Loading...">
                  <UserInfo />
                </Suspense>
              </div>
            </div>
          </div>
        </main>

        <footer className={styles.footer}>
          <span>Powered by</span>
          <a
            href="https://blitzjs.com?utm_source=blitz-new&utm_medium=app-template&utm_campaign=blitz-new"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.textLink}
          >
            Blitz.js
          </a>
        </footer>
      </div>
    </Layout>
  )
}

export default Recipes
