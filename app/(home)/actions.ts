'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { prisma } from '@/lib/prisma'

interface SubmitNewQuizzActionProps {
  title: string
  description: string
  question_text: string
  answers: {
    text: string
    is_correct: boolean
  }[]
}

export async function submitNewQuizzAction({
  description,
  question_text: questionText,
  title,
  answers,
}: SubmitNewQuizzActionProps) {
  try {
    const quizz = await prisma.quizz.create({
      data: {
        title,
        description,
        question_text: questionText,
      },
    })

    await prisma.answer.createMany({
      data: answers.map((answer) => ({
        text: answer.text,
        is_correct: answer.is_correct,
        quizz_id: quizz.id,
      })),
    })
  } catch (error) {
    console.log(error)
  }

  revalidatePath('/')
  redirect('/')
}

export async function deleteQuizzAction(quizzId: string) {
  try {
    await prisma.quizz.delete({
      where: {
        id: quizzId,
      },
      include: {
        answers: true,
      },
    })

    await prisma.answer.deleteMany({
      where: {
        quizz_id: quizzId,
      },
    })
  } catch (error) {
    console.log(error)
  }

  revalidatePath('/')
  redirect('/')
}
