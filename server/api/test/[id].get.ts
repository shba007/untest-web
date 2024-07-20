import prisma from '~/lib/prisma'
import type { Question } from '~/utils/models'
import type { TestData } from './answer/[id].post'
import shuffle from '~/server/utils/shuffle'

interface Response {
  id: string
  questions: Question[]
}

export default defineEventHandler<Promise<Response>>(async (event) => {
  try {
    const userId = readAuth(event)
    const testId = getRouterParam(event, 'id')

    if (!testId) throw createError({ statusCode: 400, statusMessage: 'testId is not defined' })

    const testData = await useStorage('data').getItem<TestData>(`test:${userId}:${testId}`)
    if (!testData) await useStorage('data').setItem(`test:${userId}:${testId}`, { startTime: Date.now(), endTime: null, answers: [] })

    const test = await prisma.test.findUniqueOrThrow({
      where: {
        id: testId,
      },
      include: { questions: true },
    })

    return {
      id: testId,
      questions: shuffle(
        test.questions.map<Question>(({ id, question, options, answer, tags }) => {
          return {
            id: id.toString(),
            question: question,
            options: options,
            answer: answer,
            tags: tags as string[],
          }
        })
      ),
    }
  } catch (error: any) {
    console.error('API test/[id] GET', error)

    if (error?.statusCode) throw error

    throw createError({ statusCode: 500, statusMessage: 'Some Unknown Error Found' })
  }
})
