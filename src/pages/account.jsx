import { useEffect, useState } from "react"
import Page from "../components/page"
import useAuth from "../hooks/useAuth"
import { useNavigate } from "react-router-dom"

export default function Login() {
  const { isConnected, user, update } = useAuth()
  const [username, setUsername] = useState("")
  const [avatar, setAvatar] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [email, setEmail] = useState("")
  const [errors, setErrors] = useState(null)
  const [errorsPassword, setErrorsPassword] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (!isConnected) {
      navigate("/login")
    }
  })

  useEffect(() => {
    if (user) {
      setUsername(user.username)
      setAvatar(user.avatar || "")
      setEmail(user.email)
    }
  }, [user])

  const handleSubmit = (event) => {
    event.preventDefault()
    setErrors(null)

    update({ username, avatar, email })
      .then((user) => {
        alert("Account updated")
      })
      .catch((errors) => {
        if (typeof errors === "string") {
          setErrors({
            username: errors,
          })
        } else {
          setErrors(errors)
        }
      })
  }

  const handleSubmitPassword = (event) => {
    event.preventDefault()
    setErrors(null)

    if (password != confirmPassword) {
      alert("Password and its confirmation should be the same")
      return
    }

    update({ password })
      .then((user) => {
        alert("Password updated")
      })
      .catch((errors) => {
        if (typeof errors === "string") {
          setErrorsPassword({
            password: errors,
          })
        } else {
          setErrorsPassword(errors)
        }
      })
  }

  return (
    <Page>
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
              <label for="avatar" className="block text-sm font-medium leading-6 text-gray-900">
                Avatar
              </label>
              <div className="mt-2">
                <input
                  id="avatar"
                  name="avatar"
                  type="text"
                  autocomplete="avatar"
                  value={avatar}
                  onChange={(e) => setAvatar(e.target.value)}
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
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </Page>
  )
}
