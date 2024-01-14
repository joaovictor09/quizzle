import { Trash2 } from 'lucide-react'
import Link from 'next/link'
import { redirect } from 'next/navigation'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { prisma } from '@/lib/prisma'

async function loadQuizzes() {
  const quizzes = prisma.quizz.findMany({
    include: {
      answers: true,
    },
  })

  return quizzes
}

export async function Quizzes() {
  const quizzes = await loadQuizzes()

  return (
    <div className="mt-10 grid grid-cols-4 gap-4">
      {quizzes.length === 0 && (
        <span className="text-sm text-muted-foreground">
          No quizzes available
        </span>
      )}

      {quizzes.map((quizz) => (
        <Card key={quizz.id}>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>{quizz.title}</span>
              <form
                action={async () => {
                  'use server'

                  redirect(`/?deleting=true&quizzId=${quizz.id}`)
                }}
              >
                <Button
                  type="submit"
                  variant="ghost"
                  size="icon"
                  className="aspect-square text-muted-foreground"
                >
                  <Trash2 />
                </Button>
              </form>
            </CardTitle>
            <CardDescription>{quizz.description}</CardDescription>
            <span className="text-sm text-muted-foreground">
              Answers: {quizz.answers.length}
            </span>
          </CardHeader>
          <CardContent>
            <Button className="w-full" asChild>
              <Link href={`/quizz/${quizz.id}`}>Make this quizz</Link>
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
