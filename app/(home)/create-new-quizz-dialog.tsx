import { redirect } from 'next/navigation'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

import { CreateNewQuizzForm } from './create-new-quizz-form'

export function CreateNewQuizzDialog({ open = false }: { open?: boolean }) {
  async function onOpenChange() {
    'use server'

    if (open) {
      redirect('/')
    } else {
      redirect('/?create=true')
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <form action={onOpenChange}>
        <Button type="submit">Create new quizz</Button>
      </form>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create new quizz</DialogTitle>
        </DialogHeader>

        <CreateNewQuizzForm />
      </DialogContent>
    </Dialog>
  )
}
