import { prisma } from '@/lib/prisma'

import { QuizzCard } from './quizz-card'

async function loadQuizzes() {
  const quizzes = prisma.quizz.findMany({
    include: {
      answers: true,
    },
  })

  return quizzes
}

interface QuizzesProps {
  sharing?: boolean
  quizzId?: string
}

export async function Quizzes({ sharing, quizzId }: QuizzesProps) {
  const quizzes = await loadQuizzes()

  return (
    <div className="mt-10 grid grid-cols-4 gap-4">
      {quizzes.length === 0 && (
        <span className="text-sm text-muted-foreground">
          No quizzes available
        </span>
      )}

      {quizzes.map((quizz) => (
        <QuizzCard
          key={quizz.id}
          quizzId={quizzId}
          sharing={sharing}
          quizz={quizz}
        />
      ))}
    </div>
  )
}
