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
    answer_selected_id?: string
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
  quizzId: string
  searchParams: {
    show_correct?: boolean
    answer_selected_id?: string
  }
  answer: {
    id: string
    text: string
    is_correct: boolean
  }
}

function AnswerCard({
  quizzId,
  answer,
  searchParams: {
    show_correct: showCorrect = false,
    answer_selected_id: answerSelectedId = '',
  },
}: AnswerCardProps) {
  const isCorrect = String(showCorrect) === 'true' && answer.is_correct
  const isInCorrect =
    String(showCorrect) === 'true' &&
    answerSelectedId === answer.id &&
    !isCorrect

  async function revealAnswer(data: FormData) {
    'use server'

    const answerId = data.get('answer_selected_id')

    redirect(
      `/quizz/${quizzId}?show_correct=true&answer_selected_id=${answerId}`,
    )
  }

  return (
    <li className="w-full">
      <form action={revealAnswer}>
        <input type="hidden" name="answer_selected_id" value={answer.id} />
        <Button
          variant="outline"
          type="submit"
          className={classNames(
            'w-full',
            isCorrect && 'border-emerald-500',
            isInCorrect && 'border-red-500',
          )}
        >
          <p>{answer.text}</p>
        </Button>
      </form>
    </li>
  )
}

export default async function Quizz({
  params: { id },
  searchParams,
}: QuizzProps) {
  const quizz = await loadQuizz(id)

  async function revealAnswer() {
    'use server'

    if (searchParams.show_correct) {
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
              quizzId={id}
              searchParams={searchParams}
              key={answer.id}
              answer={answer}
            />
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <form action={revealAnswer} className="w-full">
          <Button type="submit" className="w-full">
            {searchParams.show_correct ? 'Unreveal' : 'Reveal'}
          </Button>
        </form>
      </CardFooter>
    </Card>
  )
}
