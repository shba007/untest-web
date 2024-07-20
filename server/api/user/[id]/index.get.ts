import prisma from '~/lib/prisma'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')

  try {
    if (!id) throw createError({ statusCode: 400, statusMessage: `Invalid Id ${id}` })

    const userId = readAuth(event)

    const { name, results } = await prisma.user.findUniqueOrThrow({
      where: { id },
      include: {
        results: true,
      },
    })

    const [totalCorrectCount, totalIncorrectCount, totalDuration] = results.reduce(
      ([totalCorrectCount, totalIncorrectCount, totalDuration], { correctCount, incorrectCount, duration }) => [
        totalCorrectCount + correctCount,
        totalIncorrectCount + incorrectCount,
        totalDuration + duration,
      ],
      [0, 0, 0]
    )

    return {
      id,
      name,
      total: {
        correctCount: totalCorrectCount,
        incorrectCount: totalIncorrectCount,
        duration: totalDuration,
      },
    }
  } catch (error: any) {
    console.error(`API user/${id} GET`, error)

    if (error?.statusCode) throw error

    throw createError({ statusCode: 500, statusMessage: 'Some Unknown Error Found' })
  }
})
