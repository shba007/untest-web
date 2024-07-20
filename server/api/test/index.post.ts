import prisma from '~/lib/prisma'
import { readAuth } from '~/server/utils/auth-handler'
import type { TestData } from './answer/[id].post'

interface Request {
  testId: string
}

export default defineEventHandler(async (event) => {
  try {
    // TODO: Remove answers from the final Submission
    const { testId } = await readBody<Request>(event)
    const userId = readAuth(event)

    const testData = await useStorage('data').getItem<TestData>(`test:${userId}:${testId}`)
    if (!testData) throw createError({ statusCode: 400, statusMessage: 'testData is not defined' })

    const { startTime, answers } = testData
    const endTime = Date.now()

    const { questions } = await prisma.test.findUniqueOrThrow({
      where: {
        id: testId,
      },
      include: { questions: true },
    })

    const [correctCount, incorrectCount] = answers.reduce(
      ([correctCount, incorrectCount], { id, answer }) => {
        if (answer === questions.find((question) => question.id.toString() === id)?.answer) correctCount++
        else incorrectCount++

        return [correctCount, incorrectCount]
      },
      [0, 0]
    )

    const result = await prisma.result.create({
      data: {
        userId,
        testId,
        correctCount,
        incorrectCount,
        duration: (endTime - startTime) / 1000,
      },
    })

    return result
  } catch (error: any) {
    console.error(`API result POST`, error)

    if (error?.statusCode) throw error

    throw createError({ statusCode: 500, statusMessage: 'Some Unknown Error Found' })
  }
})
