/* eslint-disable */
import prisma from '../lib/prisma'

import fs from 'node:fs'
import path from 'node:path'
import { stringifyYAML } from 'confbox'

function writeFileConstructor(fileName: string, data: any, type: 'seed' | 'backup') {
  const filePath = path.join(process.cwd(), `/prisma/data/${type}/${fileName}.yml`)
  // JSON -> YML
  fs.writeFileSync(filePath, stringifyYAML(data), 'utf8')
}

function writeFile(fileName: string, data: any) {
  return writeFileConstructor(fileName, data, 'backup')
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

await main()
