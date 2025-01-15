import prisma from '~~/lib/prisma'

export default defineEventHandler(async (event) => {
  const testId = getRouterParam(event, 'id')

  try {
    if (!testId) throw createError({ statusCode: 400, statusMessage: 'Test Id not found' })

    const userId = readAuth(event)

    const result = await prisma.result.findUniqueOrThrow({
      where: {
        userId_testId: {
          userId,
          testId,
        },
      },
    })

    // TODO: Test Id not found

    return result
  } catch (error: unknown) {
    console.error(`API result/${testId} GET`, error)

    throw createError({ statusCode: 500, statusMessage: 'Some Unknown Error Found' })
  }
})
