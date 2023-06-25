import { BlitzPage } from "@blitzjs/auth"
import Layout from "src/core/layouts/Layout"
import NavBar from "src/core/components/NavBar"
import { Suspense } from "react"
import styles from "src/styles/Home.module.css"
const Rules: BlitzPage = () => {
  return (
    <Layout title="Rules">
      <div className={styles.globe} />
      <Suspense>
        <NavBar />
      </Suspense>{" "}
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm"> Pasta rules ! </div>
      </div>
    </Layout>
  )
}

export default Rules
