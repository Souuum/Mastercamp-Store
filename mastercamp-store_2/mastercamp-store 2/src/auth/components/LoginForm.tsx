import { AuthenticationError, PromiseReturnType } from "blitz"
import Link from "next/link"
import { LabeledTextField } from "src/core/components/LabeledTextField"
import { Form, FORM_ERROR } from "src/core/components/Form"
import login from "src/auth/mutations/login"
import { Login } from "src/auth/schemas"
import { useMutation } from "@blitzjs/rpc"
import { Routes } from "@blitzjs/next"
import styles from "src/styles/Home.module.css"

type LoginFormProps = {
  onSuccess?: (user: PromiseReturnType<typeof login>) => void
}

export const LoginForm = (props: LoginFormProps) => {
  const [loginMutation] = useMutation(login)
  return (
    <div className="flex min-h-full flex-col justify-center items-center px-6 py-12 lg:px-8">
      <h1>Login</h1>

      <Form
        submitText="Login"
        submitStyle={styles.loginButton}
        schema={Login}
        initialValues={{ email: "", password: "" }}
        onSubmit={async (values) => {
          try {
            const user = await loginMutation(values)
            props.onSuccess?.(user)
          } catch (error: any) {
            if (error instanceof AuthenticationError) {
              return { [FORM_ERROR]: "Sorry, those credentials are invalid" }
            } else {
              return {
                [FORM_ERROR]:
                  "Sorry, we had an unexpected error. Please try again. - " + error.toString(),
              }
            }
          }
        }}
      >
        <LabeledTextField name="email" label="Email" placeholder="Email" className="" />
        <LabeledTextField name="password" label="Password" placeholder="Password" type="password" />
      </Form>

      <div className="flex flex-col items-center">
        or
        <Link href={Routes.SignupPage()} className={styles.button}>
          <strong>Sign Up</strong>
        </Link>
      </div>
    </div>
  )
}

export default LoginForm
