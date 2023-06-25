import { BlitzPage } from "@blitzjs/auth"
import NavBar from "src/core/components/NavBar"
import Layout from "src/core/layouts/Layout"
import { Suspense } from "react"
import styles from "src/styles/Home.module.css"
const Categories: BlitzPage = () => {
  return (
    <Layout title="Categories">
      <div className={styles.globe} />
      <Suspense>
        <NavBar />
      </Suspense>
    </Layout>
  )
}

export default Categories
