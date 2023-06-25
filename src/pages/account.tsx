import { BlitzPage } from "@blitzjs/auth"
import { Routes, useRouter } from "@blitzjs/next"
import NavBar from "src/core/components/NavBar"
import { Suspense } from "react"
import logout from "src/auth/mutations/logout"
import { useMutation } from "@blitzjs/rpc"
import styles from "src/styles/Home.module.css"
import Link from "next/link"
import { useCurrentUser } from "src/users/hooks/useCurrentUser"
import Layout from "src/core/layouts/Layout"

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

const Account: BlitzPage = () => {
  return (
    <Layout title="Account">
      <div className={styles.globe} />
      <Suspense>
        <NavBar />
      </Suspense>
      <Suspense>
        <UserInfo />
      </Suspense>
    </Layout>
  )
}

export default Account
