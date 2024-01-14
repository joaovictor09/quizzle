'use client'

import { Loader2 } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import * as z from 'zod'

import { Button } from '@/components/ui/button'

import { deleteQuizzAction } from './actions'

export function DeleteQuizzButton({ quizzId }: { quizzId: string }) {
  const [loading, setLoading] = useState(false)

  async function handleDeleteQuizz() {
    setLoading(true)

    const schema = z.string().min(1)
    const data = schema.parse(quizzId)

    await deleteQuizzAction(data)
      .then(() => {
        toast.success('Quizz successfully deleted')
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <Button disabled={loading} onClick={handleDeleteQuizz}>
      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {loading ? 'Deleting...' : 'Confirm'}
    </Button>
  )
}
