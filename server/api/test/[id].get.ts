import prisma from "~/lib/prisma";
import { Question } from "~/utils/models";
import { TestData } from "./answer/[id].post";

function shuffle<T>(array: T[]): T[] {
  const shuffledArray = [...array];

  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }

  return shuffledArray;
}

interface Response {
  id: string,
  questions: Question[]
}

export default defineEventHandler<Promise<Response>>(async (event) => {
  try {
    const userId = readAuth(event)
    const testId = getRouterParam(event, 'id')

    if (!testId)
      throw createError({ statusCode: 400, statusMessage: 'testId is not defined' })

    const testData = await useStorage('data').getItem<TestData>(`test:${userId}:${testId}`)
    if (!testData)
      await useStorage('data').setItem(`test:${userId}:${testId}`, { startTime: Date.now(), endTime: null, answers: [] })

    const test = await prisma.test.findUniqueOrThrow({
      where: {
        id: testId,
      }, include: { questions: true }
    })

    return {
      id: testId,
      questions: shuffle(test.questions.map<Question>(({ id, question, options, answer, tags }) => {
        return {
          id: id.toString(),
          question: question,
          options: options,
          answer: answer,
          tags: tags as string[]
        }
      }))
    }
  } catch (error: any) {
    console.error("API test/[id] GET", error)

    if (error?.statusCode)
      throw error

    throw createError({ statusCode: 500, statusMessage: "Some Unknown Error Found" })
  }
})