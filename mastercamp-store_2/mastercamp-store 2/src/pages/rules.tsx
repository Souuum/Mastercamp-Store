import { BlitzPage } from "@blitzjs/auth"
import { Suspense } from "react"
import Footer from "src/core/components/Footer"
import NavBar from "src/core/components/NavBar"
import Layout from "src/core/layouts/Layout"

const Rules: BlitzPage = () => {
  return (
    <Layout title="Rules">
      <Suspense>
        <NavBar />
      </Suspense>{" "}
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm"> Pasta rules ! </div>
      </div>
      <Footer />
    </Layout>
  )
}

export default Rules
