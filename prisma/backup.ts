import { PrismaClient } from '@prisma/client'

import fs from 'node:fs'
import path from 'node:path'
import yaml from 'yaml'

const prisma = new PrismaClient()

function writeFileConstractor(fileName: string, data: any, type: 'seed' | 'backup') {
  const filePath = path.join(process.cwd(), `/prisma/data/${type}/${fileName}.yml`)
  // JSON -> YML
  fs.writeFileSync(filePath, yaml.stringify(data), 'utf8')
}

function writeFile(fileName: string, data: any) {
  return writeFileConstractor(fileName, data, 'backup')
}

async function getUsers() {
  const users = await prisma.user.findMany({
    include: {
      results: true,
    },
  })

  const results = users.map(({ id, name, email, image, role, createdAt, updatedAt, results }) => ({
    id,
    name,
    email,
    image,
    role: role.toLowerCase(),
    createdAt,
    updatedAt,
    results: results.map(({ testId, date, correctCount, incorrectCount, duration }) => ({ testId, date, correctCount, incorrectCount, duration })),
  }))

  console.log({ results })

  writeFile('users', results)
}

async function getTests() {
  const tests = await prisma.test.findMany({
    include: {
      questions: true,
    },
  })

  const results = tests.map(({ id, isDraft, createdAt, updatedAt, questions }) => ({
    id,
    isDraft,
    createdAt,
    updatedAt,
    questions: questions.map(({ id, question, options, answer, tags }) => ({ id, question, options, answer, tags: tags.map((tag) => tag.toLowerCase()) })),
  }))

  console.log({ results })

  writeFile('tests', results)
}

async function main() {
  await getUsers()
  await getTests()
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
