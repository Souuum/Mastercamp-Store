import { Suspense } from "react"
import NavBar from "src/core/components/NavBar"
import Layout from "src/core/layouts/Layout"
import Footer from "src/core/components/Footer"

export default function About() {
  return (
    <Layout title="About">
      <Suspense>
        <NavBar />
      </Suspense>{" "}
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm"> About us ... </div>
      </div>
      <Footer />
    </Layout>
  )
}
