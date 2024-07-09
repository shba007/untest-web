import prisma from "~/lib/prisma";
import { Prisma } from "@prisma/client"
import JWT from 'jsonwebtoken'


interface Request {
  email: string
}

interface Response {
  name: string;
  accessToken: string;
  refreshToken: string;
}

function preprocess(text: string) {
  text = text.trim()
  text = text.toLowerCase()
  // return text.split(" ").map((word) => word[0].toUpperCase() + word.slice(1)).join(" ")
  return text
}

export default defineEventHandler<Promise<Response>>(async (event) => {
  const { email } = await readBody<Request>(event)
  try {
    const config = useRuntimeConfig()

    const processedEmail = preprocess(email)

    const user = await prisma.user.findFirstOrThrow({
      where: {
        email: processedEmail
      }, select: {
        id: true,
        name: true
      }
    })

    let accessToken = JWT.sign({ id: user.id }, config.private.authAccessSecret, { expiresIn: '7d' })

    return {
      name: user.name,
      accessToken: accessToken,
      refreshToken: ''
    }
  } catch (error: any) {
    console.error(`API result POST`, error)

    if (error?.statusCode)
      throw error

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025')
        throw createError({ statusCode: 404, statusMessage: `${email} user not found` })
    }

    throw createError({ statusCode: 500, statusMessage: "Some Unknown Error Found" })
  }
})
