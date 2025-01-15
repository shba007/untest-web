import prisma from '~~/lib/prisma'

export default defineEventHandler(async (event) => {
  try {
    const userId = readAuth(event)

    // TODO add Role to JWT
    const user = await prisma.user.findUniqueOrThrow({
      where: {
        id: userId,
      },
      include: {
        results: true,
      },
    })

    const tests = await prisma.test.findMany({
      where:
        user.role === 'STUDENT'
          ? {
              isDraft: false,
            }
          : {},
      orderBy: {
        createdAt: 'asc',
      },
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        isDraft: true,
      },
    })

    const userTests = user.results.map(({ testId }) => testId)

    return tests.map(({ id, createdAt, updatedAt, isDraft }) => ({
      id,
      createdAt,
      updatedAt,
      isDraft,
      isComplete: userTests.includes(id),
    }))
  } catch (error: unknown) {
    console.error('API test GET', error)

    if (error instanceof Error && 'statusCode' in error) {
      throw error
    }

    throw createError({ statusCode: 500, statusMessage: 'Some Unknown Error Found' })
  }
})
