import { BlitzPage } from "@blitzjs/auth"
import NavBar from "src/core/components/NavBar"
import Layout from "src/core/layouts/Layout"
import { Suspense } from "react"
import styles from "src/styles/Home.module.css"
import { useCurrentUser } from "src/users/hooks/useCurrentUser"
import { useMutation } from "@blitzjs/rpc"
import Link from "next/link"
import { Routes } from "@blitzjs/next"
import { useAllCategories } from "src/categories/hooks/useAllCategories"
import RecipeRow from "src/recipes/components/RecipeRow"
import Footer from "src/core/components/Footer"

const UserInfo = () => {
  const categories = useAllCategories()

  return (
    <>
      {categories && (
        <RecipeRow title={`All categories`}>
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
      )}
    </>
  )
}

const Categories: BlitzPage = () => {
  return (
    <Layout title="Categories">
      <Suspense>
        <NavBar />
      </Suspense>
      <div>
        <Suspense fallback="Loading...">
          <UserInfo />
        </Suspense>

        <Footer />
      </div>
    </Layout>
  )
}

export default Categories
