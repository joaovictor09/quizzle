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

import { ShareQuizzDialog } from './share-quizz-dialog'

interface QuizzCardProps {
  sharing?: boolean
  quizzId?: string
  quizz: {
    id: string
    title: string
    description: string
    answers: {
      id: string
      text: string
      is_correct: boolean
    }[]
  }
}

export function QuizzCard({ quizz, sharing }: QuizzCardProps) {
  return (
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
      <CardContent className="flex gap-4">
        <ShareQuizzDialog quizzId={quizz.id} open={sharing} />
        <Button className="w-full" asChild>
          <Link href={`/quizz/${quizz.id}`}>Make this quizz</Link>
        </Button>
      </CardContent>
    </Card>
  )
}
