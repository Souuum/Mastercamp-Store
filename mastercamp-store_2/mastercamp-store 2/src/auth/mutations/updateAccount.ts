import { NotFoundError, AuthenticationError } from "blitz"
import { resolver } from "@blitzjs/rpc"
import { SecurePassword } from "@blitzjs/auth/secure-password"
import db from "db"
import { authenticateUser } from "./login"
import { UpdateAccount } from "../schemas"

export default resolver.pipe(
  resolver.zod(UpdateAccount),
  resolver.authorize(),
  async ({ email, username }, ctx) => {
    const user = await db.user.findFirst({ where: { id: ctx.session.userId } })
    if (!user) throw new NotFoundError()

    await db.user.update({
      where: { id: user.id },
      data: { email, username },
    })

    return true
  }
)
