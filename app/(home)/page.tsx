import { Suspense } from 'react'

import { CreateNewQuizzDialog } from './create-new-quizz-dialog'
import { DeleteQuizzDialog } from './delete-quizz-dialog'
import { Quizzes } from './quizzes'
import { QuizzesSkeleton } from './quizzes-skeleton'

interface HomeProps {
  searchParams: {
    create?: boolean
    deleting?: boolean
    quizzId?: string
  }
}

export default async function Home({
  searchParams: { create, deleting, quizzId },
}: HomeProps) {
  return (
    <div className="w-full p-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="flex w-full flex-col text-3xl font-bold">Quizzes</h1>
          <p className="text-sm text-muted-foreground">
            Discovery all quizzes available!
          </p>
        </div>

        <CreateNewQuizzDialog open={create} />
        <DeleteQuizzDialog open={deleting} quizzId={quizzId} />
      </div>

      <Suspense fallback={<QuizzesSkeleton />}>
        <Quizzes />
      </Suspense>
    </div>
  )
}
