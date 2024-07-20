export interface Question {
  id: string
  question: string
  options: string[]
  answer: number
  tags: string[]
}

export interface Answer {
  id: string
  answer: number
}
