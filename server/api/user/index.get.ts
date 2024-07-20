import prisma from '~/lib/prisma'
import { Role } from '@prisma/client'

interface Response {
  id: string
  name: string
  stats: {
    totalCorrectCount: number
    totalIncorrectCount: number
    totalDuration: number
  }
}

function sortByRaking(data: Response[]) {
  return data.sort((a, b) => {
    if (a.stats.totalCorrectCount !== b.stats.totalCorrectCount) {
      return b.stats.totalCorrectCount - a.stats.totalCorrectCount
    } else {
      return a.stats.totalDuration - b.stats.totalDuration
    }
  })
}

export default defineEventHandler<Promise<Response[]>>(async (event) => {
  try {
    const query = getQuery(event)
    const userId = readAuth(event)

    const lastCount = parseInt(query.lastCount!.toString()) ?? 3

    const user = await prisma.user.findUniqueOrThrow({
      where: { id: userId },
    })

    const testIds = (
      await prisma.test.findMany({
        where: {
          isDraft: false,
        },
        select: {
          id: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
        take: lastCount,
      })
    ).map(({ id }) => id)

    const users = await prisma.user.findMany({
      where:
        user.role === 'STUDENT'
          ? {
              role: Role.STUDENT,
            }
          : {},
      include: {
        results: {
          where: {
            test: {
              id: {
                in: testIds,
              },
            },
          },
        },
      },
    })

    return sortByRaking(
      users.map(({ id, name, results }) => {
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
          stats: {
            totalCorrectCount,
            totalIncorrectCount,
            totalDuration,
          },
        }
      })
    )
  } catch (error) {
    console.error('API user GET', error)

    throw createError({ statusCode: 500, statusMessage: 'Some Unknown Error Found' })
  }
})
