import { BlitzPage } from "@blitzjs/auth"
import NavBar from "src/core/components/NavBar"
import Layout from "src/core/layouts/Layout"
import { Suspense } from "react"
import styles from "src/styles/Home.module.css"
import { useCurrentUser } from "src/users/hooks/useCurrentUser"
import { useMutation } from "@blitzjs/rpc"
import Link from "next/link"
import { Routes } from "@blitzjs/next"

const UserInfo = () => {
  const currentUser = useCurrentUser()

  if (currentUser) {
    return (
      <div className="flex flex-col justify-center items-center">
        <div className={styles.body}></div>
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

const Categories: BlitzPage = () => {
  return (
    <Layout title="Categories">
      <div className={styles.globe} />
      <Suspense>
        <NavBar />
      </Suspense>
      <div className={styles.container}>
        <main className={styles.main}>
          <div className={styles.wrapper}>
            <div className={styles.buttonContainer}>
              <Suspense fallback="Loading...">
                <UserInfo />
              </Suspense>
            </div>
          </div>
        </main>

        <footer className={styles.footer}></footer>
      </div>
    </Layout>
  )
}

export default Categories
