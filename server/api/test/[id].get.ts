import prisma from '~~/lib/prisma'
import type { Question } from '~/utils/models'
import type { TestData } from './answer/[id].post'

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
        test.questions.map(({ id, question, options, answer, tags }: { id: number; question: string; options: string[]; answer: string; tags: string[] }) => {
          return {
            id: id.toString(),
            question: question,
            options: options,
            answer: answer,
            tags: tags,
          }
        })
      ),
    }
  } catch (error: unknown) {
    console.error('API test/[id] GET', error)

    if (error instanceof Error && 'statusCode' in error) {
      throw error
    }

    throw createError({ statusCode: 500, statusMessage: 'Some Unknown Error Found' })
  }
})
