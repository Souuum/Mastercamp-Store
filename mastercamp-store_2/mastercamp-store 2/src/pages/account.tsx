import { BlitzPage } from "@blitzjs/auth"
import { Routes, useRouter } from "@blitzjs/next"
import NavBar from "src/core/components/NavBar"
import { Suspense, useEffect, useState } from "react"
import logout from "src/auth/mutations/logout"
import { useMutation } from "@blitzjs/rpc"
import styles from "src/styles/Home.module.css"
import Link from "next/link"
import { useCurrentUser } from "src/users/hooks/useCurrentUser"
import Layout from "src/core/layouts/Layout"
import changePassword from "src/auth/mutations/changePassword"
import updateAccount from "src/auth/mutations/updateAccount"

const UserInfo = () => {
  const currentUser = useCurrentUser()
  const [logoutMutation] = useMutation(logout)

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [currentPassword, setCurrentPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [email, setEmail] = useState("")
  const [errors, setErrors] = useState(null)
  const [errorsPassword, setErrorsPassword] = useState(null)

  const [changePasswordMutation] = useMutation(changePassword)

  const [updateAccountMutation] = useMutation(updateAccount)

  useEffect(() => {
    if (currentUser) {
      setUsername(currentUser.username)
      setEmail(currentUser.email)
    }
  }, [currentUser])

  const handleSubmit = async (event) => {
    event.preventDefault()
    setErrors(null)

    try {
      await updateAccountMutation({ email, username })
      alert("Account updated")
    } catch (e) {
      setErrors({
        username: e.toString(),
      })
    }
  }

  const handleSubmitPassword = async (event) => {
    event.preventDefault()
    setErrors(null)

    if (password != confirmPassword) {
      alert("Password and its confirmation should be the same")
      return
    }

    try {
      await changePasswordMutation({ currentPassword, newPassword: password })
      alert("Password updated")
    } catch (e) {
      setErrorsPassword({
        password: e.toString(),
      })
    }
  }

  if (currentUser) {
    return (
      <>
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="m10t- text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Edit profile
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            {errors && (
              <div
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                role="alert"
              >
                {Object.keys(errors).map((key) => (
                  <p>- {errors[key]}</p>
                ))}
              </div>
            )}
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label for="username" className="block text-sm font-medium leading-6 text-gray-900">
                  Username
                </label>
                <div className="mt-2">
                  <input
                    id="username"
                    name="username"
                    type="text"
                    autocomplete="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <label for="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Email
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="text"
                    autocomplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Update
                </button>
              </div>
            </form>
          </div>

          <div className="sm:mx-auto sm:w-full sm:max-w-sm" style={{ marginTop: "4rem" }}>
            <h2 className="m10t- text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Edit password
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            {errorsPassword && (
              <div
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                role="alert"
              >
                {Object.keys(errorsPassword).map((key) => (
                  <p>- {errorsPassword[key]}</p>
                ))}
              </div>
            )}
            <form className="space-y-6" onSubmit={handleSubmitPassword}>
              <div>
                <label for="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autocomplete="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <label
                  for="confirmPassword"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Confirm password
                </label>
                <div className="mt-2">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    autocomplete="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <label
                  for="currentPassword"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Current Password
                </label>
                <div className="mt-2">
                  <input
                    id="currentPassword"
                    name="currentPassword"
                    type="password"
                    autocomplete="currentPassword"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Update
                </button>
              </div>
            </form>
            <br />
            <button
              className={styles.button}
              onClick={async () => {
                await logoutMutation()
              }}
            >
              Logout
            </button>
          </div>
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
