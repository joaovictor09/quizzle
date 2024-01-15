import classNames from 'classnames'
import { redirect } from 'next/navigation'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { prisma } from '@/lib/prisma'

type QuizzProps = {
  params: {
    id: string
  }
  searchParams: {
    show_correct?: boolean
  }
}

async function loadQuizz(quizzId: string) {
  const quizz = await prisma.quizz.findUnique({
    where: {
      id: quizzId,
    },
    include: {
      answers: true,
    },
  })

  return quizz
}

interface AnswerCardProps {
  showCorrect?: boolean
  answer: {
    text: string
    is_correct: boolean
  }
}

function AnswerCard({ answer, showCorrect = false }: AnswerCardProps) {
  const isCorrect = String(showCorrect) === 'true' && answer.is_correct

  return (
    <li
      className={classNames(
        'rounded-md border p-4',
        isCorrect ? 'border-emerald-500' : 'border-muted',
      )}
    >
      <p>{answer.text}</p>
    </li>
  )
}

export default async function Quizz({
  params: { id },
  searchParams: { show_correct: showCorrect },
}: QuizzProps) {
  const quizz = await loadQuizz(id)

  async function revealAnswer() {
    'use server'

    if (showCorrect) {
      redirect(`/quizz/${id}`)
    }

    redirect(`/quizz/${id}?show_correct=true`)
  }

  return (
    <Card className="my-auto w-full max-w-lg">
      <CardHeader>
        <CardTitle>{quizz?.title}</CardTitle>
        <CardDescription>{quizz?.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <h2 className="mb-4 text-center">Question: {quizz?.question_text}</h2>

        <ul className="flex w-full flex-col gap-2">
          {quizz?.answers.map((answer) => (
            <AnswerCard
              showCorrect={showCorrect}
              key={answer.id}
              answer={answer}
            />
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <form action={revealAnswer} className="w-full">
          <Button type="submit" className="w-full">
            {showCorrect ? 'Unreveal' : 'Reveal'}
          </Button>
        </form>
      </CardFooter>
    </Card>
  )
}
